import { authOptions } from "../api/auth/[...nextauth]";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // Update the path to your handler

// Mock Next.js' NextApiRequest and NextApiResponse objects
const mockRequest = () => ({ method: 'POST', body: {} }) as any;
const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock PrismaClient and bcrypt functions
jest.mock('@prisma/client');
jest.mock('bcrypt');

describe('User Registration API', () => {
    const mockedPrismaClient = PrismaClient as jest.MockedClass<typeof PrismaClient>;
    const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle valid user registration', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
        mockedPrismaClient.prototype.user.findUnique.mockResolvedValue(null);
        mockedBcrypt.hash.mockResolvedValue('hashedPassword');
        mockedPrismaClient.prototype.user.create.mockResolvedValue(mockUser);

        await authOptions(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Welcome stranger!' });
    });

    it('should handle duplicate email during registration', async () => {
        const req = mockRequest();
        const res = mockResponse();

        mockedPrismaClient.prototype.user.findUnique.mockResolvedValue({ email: 'test@example.com' });

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email already registered.' });
    });

    it('should handle invalid email during registration', async () => {
        const req = mockRequest();
        req.body.email = 'invalidEmail';
        const res = mockResponse();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Your email is invalid. Please enter a valid email address.'
        });
    });

    it('should handle server error during registration', async () => {
        const req = mockRequest();
        const res = mockResponse();

        mockedPrismaClient.prototype.user.findUnique.mockRejectedValue(new Error('Database error'));

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Something broke.' });
    });

    it('should handle unsupported HTTP method', async () => {
        const req = { ...mockRequest(), method: 'GET' };
        const res = mockResponse();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.json).toHaveBeenCalledWith({ message: 'nobody here' });
    });
});
