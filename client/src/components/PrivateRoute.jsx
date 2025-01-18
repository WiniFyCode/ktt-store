import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

// Component bảo vệ route admin, chỉ cho phép admin truy cập
export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [showLoginDialog, setShowLoginDialog] = useState(!token);
  const navigate = useNavigate();

  // Nếu chưa đăng nhập, hiện dialog
  if (!token) {
    return (
      <>
        {showLoginDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="text-3xl text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Bạn chưa đăng nhập
                </h3>
                <p className="text-gray-500 mb-6">
                  Vui lòng đăng nhập để tiếp tục truy cập
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowLoginDialog(false)}
                    className="px-4 py-2 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Nếu không phải admin, chuyển về trang chủ
  if (role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Nếu là admin, cho phép truy cập
  return children;
};

// Component bảo vệ route yêu cầu đăng nhập
export const AuthRoute = ({ children }) => {
  // Kiểm tra customerToken thay vì token
  const customerToken = localStorage.getItem('customerToken');
  const [showLoginDialog, setShowLoginDialog] = useState(!customerToken);
  const navigate = useNavigate();

  // Nếu chưa đăng nhập, hiện dialog
  if (!customerToken) {
    return (
      <>
        {showLoginDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="text-3xl text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Bạn chưa đăng nhập
                </h3>
                <p className="text-gray-500 mb-6">
                  Vui lòng đăng nhập để tiếp tục truy cập
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowLoginDialog(false)}
                    className="px-4 py-2 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Nếu đã đăng nhập, cho phép truy cập
  return children;
};