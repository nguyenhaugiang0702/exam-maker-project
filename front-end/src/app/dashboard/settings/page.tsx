"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Bell, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Cài đặt
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Quản lý các tùy chọn và cài đặt hệ thống
                </p>
            </div>

            {/* Notifications Settings */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <CardTitle>Thông báo</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Quản lý cách bạn nhận thông báo
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                Thông báo email
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Nhận thông báo qua email
                            </p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                Thông báo đề thi mới
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Thông báo khi có đề thi mới
                            </p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <CardTitle>Bảo mật</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Cài đặt bảo mật tài khoản
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                Xác thực hai yếu tố
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Tăng cường bảo mật tài khoản
                            </p>
                        </div>
                        <Button variant="outline" size="sm">
                            Bật
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                Phiên đăng nhập
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Quản lý các thiết bị đã đăng nhập
                            </p>
                        </div>
                        <Button variant="outline" size="sm">
                            Xem
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <Palette className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <CardTitle>Giao diện</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Tùy chỉnh giao diện hiển thị
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Chế độ hiển thị</Label>
                        <div className="flex space-x-2">
                            <Button variant="outline" className="flex-1">
                                Sáng
                            </Button>
                            <Button variant="outline" className="flex-1">
                                Tối
                            </Button>
                            <Button variant="outline" className="flex-1">
                                Tự động
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
