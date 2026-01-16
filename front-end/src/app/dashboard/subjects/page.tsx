"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus, Edit2, Trash2, X, Save, Search } from "lucide-react";
import { subjectService, Subject, CreateSubjectData } from "@/services/subject.service";

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

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
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (subject.description && subject.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
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
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>Thêm môn học</span>
                </Button>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Form Card */}
            {isFormOpen && (
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold">
                                    {editingSubject ? "Chỉnh sửa môn học" : "Thêm môn học mới"}
                                </CardTitle>
                                <CardDescription>
                                    {editingSubject ? "Cập nhật thông tin môn học" : "Nhập thông tin môn học mới"}
                                </CardDescription>
                            </div>
                            <Button
                                onClick={handleCloseForm}
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-900">
                                        Tên môn học <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        placeholder="Ví dụ: Toán học"
                                        className="h-11 text-gray-900"
                                        required
                                        minLength={2}
                                        maxLength={100}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code" className="text-gray-900">
                                        Mã môn học <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="code"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleFormChange}
                                        placeholder="Ví dụ: MATH101"
                                        className="h-11 text-gray-900"
                                        required
                                        minLength={2}
                                        maxLength={20}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-gray-900">
                                    Mô tả
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    placeholder="Mô tả về môn học (tùy chọn)"
                                    className="min-h-[100px] text-gray-900"
                                    maxLength={500}
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button
                                    type="submit"
                                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{editingSubject ? "Cập nhật" : "Thêm mới"}</span>
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCloseForm}
                                    variant="outline"
                                    className="text-gray-900"
                                >
                                    Hủy
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Subjects List Card */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">Danh sách môn học</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Tìm kiếm môn học..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-10 text-gray-900"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8 text-gray-500">
                            Đang tải danh sách môn học...
                        </div>
                    ) : filteredSubjects.length === 0 ? (
                        <div className="text-center py-8">
                            <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-500">
                                {searchTerm ? "Không tìm thấy môn học nào" : "Chưa có môn học nào"}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Tên môn học
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Mã môn học
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Mô tả
                                        </th>
                                        <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubjects.map((subject) => (
                                        <tr
                                            key={subject._id}
                                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                        >
                                            <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">
                                                {subject.name}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                                                    {subject.code}
                                                </code>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                                {subject.description || "-"}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button
                                                        onClick={() => handleEdit(subject)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(subject._id)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}