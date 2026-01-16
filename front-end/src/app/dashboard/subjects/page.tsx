"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus, Edit2, Trash2, X, Save, Search, FolderOpen } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { subjectService, Subject, CreateSubjectData } from "@/services/subject.service";

// Modal colors for subjects
const SUBJECT_COLORS = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-green-400 to-green-600",
    "from-yellow-400 to-yellow-600",
    "from-red-400 to-red-600",
    "from-indigo-400 to-indigo-600",
    "from-teal-400 to-teal-600",
];

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, pageSize]);

    // Form states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [formData, setFormData] = useState<CreateSubjectData>({
        name: "",
        code: "",
        description: "",
    });

    // Load subjects on mount
    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        setIsLoading(true);
        setError("");
        try {
            const data = await subjectService.getAllSubjects();
            setSubjects(data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Không thể tải danh sách môn học");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            if (editingSubject) {
                await subjectService.updateSubject(editingSubject._id, formData);
                setSuccess("Cập nhật môn học thành công!");
            } else {
                await subjectService.createSubject(formData);
                setSuccess("Thêm môn học mới thành công!");
            }

            loadSubjects();
            handleCloseForm();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Có lỗi xảy ra";
            setError(Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage);
        }
    };

    const handleEdit = (subject: Subject) => {
        setEditingSubject(subject);
        setFormData({
            name: subject.name,
            code: subject.code,
            description: subject.description || "",
        });
        setIsFormOpen(true);
        setError("");
        setSuccess("");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
            return;
        }

        setError("");
        setSuccess("");

        try {
            await subjectService.deleteSubject(id);
            setSuccess("Xóa môn học thành công!");
            loadSubjects();
        } catch (err: any) {
            setError(err.response?.data?.message || "Không thể xóa môn học");
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingSubject(null);
        setFormData({
            name: "",
            code: "",
            description: "",
        });
        setError("");
    };

    const handleAddNew = () => {
        setEditingSubject(null);
        setFormData({
            name: "",
            code: "",
            description: "",
        });
        setIsFormOpen(true);
        setError("");
        setSuccess("");
    };

    const filteredSubjects = subjects.filter(subject =>
        (subject.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (subject.code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (subject.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Quản lý môn học
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Quản lý danh sách các môn học trong hệ thống
                    </p>
                </div>
                <Button
                    onClick={handleAddNew}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Thêm môn học
                </Button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-gray-100 dark:border-gray-700">
                {/* Left: Page Size Selector */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2"
                    >
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                    </select>
                    <span className="text-sm text-gray-600 dark:text-gray-400">môn học</span>
                </div>

                {/* Right: Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm môn học..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-10 text-gray-900 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
                        <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        {editingSubject ? "Chỉnh sửa môn học" : "Thêm môn học mới"}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {editingSubject ? "Cập nhật thông tin môn học" : "Nhập thông tin môn học mới"}
                                    </p>
                                </div>
                                <Button
                                    onClick={handleCloseForm}
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Error Message in Modal */}
                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tên môn học <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        placeholder="Ví dụ: Toán học"
                                        className="h-11 rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                                        required
                                        minLength={2}
                                        maxLength={100}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mã môn học <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="code"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleFormChange}
                                        placeholder="Ví dụ: MATH101"
                                        className="h-11 rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                                        required
                                        minLength={2}
                                        maxLength={20}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Mô tả
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    placeholder="Mô tả chi tiết về nội dung môn học..."
                                    className="min-h-[120px] rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                    maxLength={500}
                                />
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <Button
                                    type="button"
                                    onClick={handleCloseForm}
                                    variant="outline"
                                    className="h-11 text-gray-900 px-6 rounded-lg border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-11 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    <span>{editingSubject ? "Cập nhật" : "Thêm mới"}</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">{success}</p>
                </div>
            )}

            {/* Content Area */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Đang tải danh sách môn học...</p>
                </div>
            ) : filteredSubjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {searchTerm ? "Không tìm thấy kết quả" : "Danh sách trống"}
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        {searchTerm
                            ? `Không tìm thấy môn học nào phù hợp với từ khóa "${searchTerm}"`
                            : "Chưa có môn học nào được tạo. Hãy bắt đầu bằng cách thêm môn học mới."}
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSubjects.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((subject, index) => (
                            <Card
                                key={subject._id}
                                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative overflow-hidden bg-white dark:bg-gray-800"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 opacity-10 transition-opacity group-hover:opacity-20">
                                    <div className={`w-full h-full bg-gradient-to-br ${SUBJECT_COLORS[index % SUBJECT_COLORS.length]} rounded-full blur-2xl`}></div>
                                </div>

                                <CardHeader className="relative pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${SUBJECT_COLORS[index % SUBJECT_COLORS.length]} rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                                            <BookOpen className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Button
                                                onClick={(e) => { e.stopPropagation(); handleEdit(subject); }}
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                                                title="Sửa"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(subject._id); }}
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="relative pt-4">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {subject.name}
                                    </h3>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-md text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                            {subject.code}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[40px] leading-relaxed">
                                        {subject.description || "Chưa có mô tả cho môn học này"}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {filteredSubjects.length >= pageSize && (
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Hiển thị <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> đến <span className="font-medium">{Math.min(currentPage * pageSize, filteredSubjects.length)}</span> trong tổng số <span className="font-medium">{filteredSubjects.length}</span> môn học
                            </p>

                            <Pagination className="mx-0 w-auto">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="text-gray-900 dark:text-gray-100"
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.ceil(filteredSubjects.length / pageSize) }, (_, i) => i + 1)
                                        .filter(page => page === 1 || page === Math.ceil(filteredSubjects.length / pageSize) || Math.abs(page - currentPage) <= 1)
                                        .map((page, index, array) => (
                                            <React.Fragment key={page}>
                                                {index > 0 && array[index - 1] !== page - 1 && (
                                                    <PaginationItem>
                                                        <PaginationEllipsis className="text-gray-900 dark:text-gray-100" />
                                                    </PaginationItem>
                                                )}
                                                <PaginationItem>
                                                    <PaginationLink
                                                        isActive={currentPage === page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`text-gray-900 dark:text-gray-100 border ${currentPage === page ? "bg-blue-500 text-white" : ""}`}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            </React.Fragment>
                                        ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredSubjects.length / pageSize)))}
                                            disabled={currentPage === Math.ceil(filteredSubjects.length / pageSize)}
                                            className="text-gray-900 dark:text-gray-100"
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}