"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockSubjects = [
    {
        id: 1,
        name: "Toán",
        examsCount: 8,
        questionsCount: 120,
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 2,
        name: "Vật lý",
        examsCount: 6,
        questionsCount: 95,
        color: "from-purple-500 to-pink-500",
    },
    {
        id: 3,
        name: "Hóa học",
        examsCount: 5,
        questionsCount: 87,
        color: "from-green-500 to-emerald-500",
    },
    {
        id: 4,
        name: "Sinh học",
        examsCount: 5,
        questionsCount: 76,
        color: "from-orange-500 to-red-500",
    },
    {
        id: 5,
        name: "Văn",
        examsCount: 4,
        questionsCount: 45,
        color: "from-indigo-500 to-blue-500",
    },
    {
        id: 6,
        name: "Anh",
        examsCount: 7,
        questionsCount: 102,
        color: "from-yellow-500 to-orange-500",
    },
];

export default function SubjectsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Quản lý môn học
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Quản lý các môn học và đề thi theo môn
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Thêm môn học
                </Button>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSubjects.map((subject) => (
                    <Card key={subject.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                        <CardHeader>
                            <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <FolderOpen className="w-6 h-6 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mb-4">
                                {subject.name}
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Số đề thi:</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                        {subject.examsCount}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Số câu hỏi:</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                        {subject.questionsCount}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
