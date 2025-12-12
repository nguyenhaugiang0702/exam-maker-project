"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockExams = [
    {
        id: 1,
        title: "Đề thi Toán học kỳ 1",
        subject: "Toán",
        questions: 30,
        createdAt: "2024-12-10",
        status: "published",
    },
    {
        id: 2,
        title: "Đề thi Vật lý giữa kỳ",
        subject: "Vật lý",
        questions: 25,
        createdAt: "2024-12-08",
        status: "draft",
    },
    {
        id: 3,
        title: "Đề thi Hóa học cuối kỳ",
        subject: "Hóa học",
        questions: 35,
        createdAt: "2024-12-05",
        status: "published",
    },
    {
        id: 4,
        title: "Đề thi Sinh học giữa kỳ",
        subject: "Sinh học",
        questions: 28,
        createdAt: "2024-12-03",
        status: "draft",
    },
];

export default function ExamsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Quản lý đề thi
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Tạo và quản lý các đề thi của bạn
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Tạo đề thi mới
                </Button>
            </div>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockExams.map((exam) => (
                    <Card key={exam.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${exam.status === "published"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        }`}
                                >
                                    {exam.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                                {exam.title}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <p>Môn: {exam.subject}</p>
                                <p>Số câu hỏi: {exam.questions}</p>
                                <p>Ngày tạo: {exam.createdAt}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
