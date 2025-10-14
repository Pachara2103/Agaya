const authController = require('../../controllers/auth-controller'); 
const authService = require('../../services/auth-service'); 
const { sendTokenResponse } = require('../../utils/authUtils'); 

jest.mock('../../services/auth-service');
jest.mock('../../utils/authUtils', () => ({
    sendTokenResponse: jest.fn(),
}));

const mockReq = (body) => ({
    body,
});

const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
};

const mockNext = jest.fn();

describe('Auth Controller Unit Tests', () => {
    const mockUser = {
        id: 'user123',
        email: 'test@example.com'
    };
    const userData = { email: 'test@example.com', password: 'Password123' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // US1-1
    describe('register', () => {
        it('should call authService.register and sendTokenResponse with 201 on success', async () => {
            authService.register.mockResolvedValue(mockUser);
            const req = mockReq(userData);
            const res = mockRes();

            await authController.register(req, res, mockNext);

            expect(authService.register).toHaveBeenCalledWith(userData);
            expect(sendTokenResponse).toHaveBeenCalledWith(mockUser, 201, res);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next with error on service failure', async () => {
            const mockError = new Error('Registration failed');
            authService.register.mockRejectedValue(mockError);
            const req = mockReq(userData);
            const res = mockRes();

            await authController.register(req, res, mockNext);

            expect(authService.register).toHaveBeenCalled();
            expect(sendTokenResponse).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    // US1-2
    describe('login', () => {
        it('should call authService.login and sendTokenResponse with 200 on success', async () => {
            authService.login.mockResolvedValue(mockUser);
            const req = mockReq(userData);
            const res = mockRes();

            await authController.login(req, res, mockNext);

            expect(authService.login).toHaveBeenCalledWith(userData);
            expect(sendTokenResponse).toHaveBeenCalledWith(mockUser, 200, res);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next with error on service failure', async () => {
            const mockError = new Error('Login failed');
            authService.login.mockRejectedValue(mockError);
            const req = mockReq(userData);
            const res = mockRes();

            await authController.login(req, res, mockNext);

            expect(authService.login).toHaveBeenCalled();
            expect(sendTokenResponse).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});