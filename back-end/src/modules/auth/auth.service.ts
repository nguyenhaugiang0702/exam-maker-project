import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    ConsoleLogger,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async register(createUserDto: CreateUserDto) {
        const newUser = await this.usersService.create(createUserDto);
        return this.login(newUser);
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Generate random token
        const token =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        // Save token to user (you might want to hash this in production)
        await this.usersService.update(user._id.toString(), {
            resetPasswordToken: token,
        } as any);

        // Send email
        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password Token',
            text: `Your reset password token is: ${token}`,
            // html: `<b>Your reset password token is: ${token}</b>` // Use template in real app
        });

        return { message: 'Reset password email sent' };
    }

    async resetPassword(email: string, token: string, newPassword: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || user.resetPasswordToken !== token) {
            throw new BadRequestException('Invalid token or email');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.update(user._id.toString(), {
            password: hashedPassword,
            resetPasswordToken: null, // Clear token
        } as any);

        return { message: 'Password reset successfully' };
    }

    async changePassword(
        email: string,
        currentPassword: string,
        newPassword: string,
    ) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || !user.password) {
            throw new BadRequestException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password,
        );
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid current password');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.update(user._id.toString(), {
            password: hashedPassword,
        } as any);

        return { message: 'Password changed successfully' };
    }
}
