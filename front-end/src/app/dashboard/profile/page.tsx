"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Building2, Calendar, Edit2, Save, X, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/user.service";

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Profile form state
    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        school: user?.school || "",
    });

    // Password form state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveProfile = async () => {
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const updatedUser = await userService.updateProfile(profileData);
            updateUser(updatedUser);
            setSuccess("Cập nhật thông tin thành công!");
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message || "Cập nhật thất bại. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setProfileData({
            fullName: user?.fullName || "",
            email: user?.email || "",
            school: user?.school || "",
        });
        setIsEditing(false);
        setError("");
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("Mật khẩu mới không khớp!");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
            return;
        }

        setIsLoading(true);

        try {
            await userService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setSuccess("Đổi mật khẩu thành công!");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setIsChangingPassword(false);
        } catch (err: any) {
            setError(err.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Hồ sơ cá nhân
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
                </p>
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

            {/* Profile Information Card */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Thông tin cá nhân</CardTitle>
                            <CardDescription>Thông tin cơ bản về tài khoản của bạn</CardDescription>
                        </div>
                        {!isEditing ? (
                            <Button
                                onClick={() => setIsEditing(true)}
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span>Chỉnh sửa</span>
                            </Button>
                        ) : (
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSaveProfile}
                                    disabled={isLoading}
                                    size="sm"
                                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Lưu</span>
                                </Button>
                                <Button
                                    onClick={handleCancelEdit}
                                    disabled={isLoading}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Hủy</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">
                                {user?.fullName?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {user?.fullName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user?.email}
                            </p>
                            <Badge className="mt-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                Giáo viên
                            </Badge>
                        </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>Họ và tên</span>
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={profileData.fullName}
                                onChange={handleProfileChange}
                                disabled={!isEditing}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>Email</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleProfileChange}
                                disabled={!isEditing}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="school" className="flex items-center space-x-2">
                                <Building2 className="w-4 h-4" />
                                <span>Trường học</span>
                            </Label>
                            <Input
                                id="school"
                                name="school"
                                value={profileData.school}
                                onChange={handleProfileChange}
                                disabled={!isEditing}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>Ngày tham gia</span>
                            </Label>
                            <Input
                                value={new Date(user?.createdAt || "").toLocaleDateString("vi-VN")}
                                disabled
                                className="h-11 bg-gray-50 dark:bg-gray-800"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Đổi mật khẩu</CardTitle>
                            <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản</CardDescription>
                        </div>
                        {!isChangingPassword && (
                            <Button
                                onClick={() => setIsChangingPassword(true)}
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Đổi mật khẩu</span>
                            </Button>
                        )}
                    </div>
                </CardHeader>
                {isChangingPassword && (
                    <CardContent>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="h-11"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="h-11"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="h-11"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {isLoading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setIsChangingPassword(false);
                                        setPasswordData({
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmPassword: "",
                                        });
                                        setError("");
                                    }}
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
