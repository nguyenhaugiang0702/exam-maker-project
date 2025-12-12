"use client";

import { FileText, FolderOpen, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
    {
        name: "Tổng đề thi",
        value: "24",
        icon: FileText,
        change: "+12%",
        changeType: "increase",
    },
    {
        name: "Môn học",
        value: "8",
        icon: FolderOpen,
        change: "+2",
        changeType: "increase",
    },
    {
        name: "Câu hỏi",
        value: "342",
        icon: Users,
        change: "+48",
        changeType: "increase",
    },
    {
        name: "Hoàn thành",
        value: "18",
        icon: TrendingUp,
        change: "75%",
        changeType: "neutral",
    },
];

const recentExams = [
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
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Chào mừng trở lại! 👋
                </h1>
                <p className="text-blue-100">
                    Hãy bắt đầu tạo đề thi mới hoặc quản lý các đề thi hiện có của bạn
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.name}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                                        {stat.value}
                                    </p>
                                    <p className={`text-sm mt-2 ${stat.changeType === "increase"
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-gray-600 dark:text-gray-400"
                                        }`}>
                                        {stat.change} so với tháng trước
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Exams */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Đề thi gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentExams.map((exam) => (
                            <div
                                key={exam.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                            {exam.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {exam.subject} • {exam.questions} câu hỏi • {exam.createdAt}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${exam.status === "published"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                            }`}
                                    >
                                        {exam.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                    Tạo đề thi mới
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Bắt đầu tạo đề thi
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FolderOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                    Quản lý môn học
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Xem tất cả môn học
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                    Ngân hàng câu hỏi
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Quản lý câu hỏi
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
