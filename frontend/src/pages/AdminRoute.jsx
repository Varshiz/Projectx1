import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'admin') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeInAdmin 1.2s cubic-bezier(.77,0,.175,1)'
        }}
      >
        <style>
          {`
            @keyframes fadeInAdmin {
              0% { opacity: 0; transform: translateY(40px) scale(0.98);}
              60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
              100% { opacity: 1; transform: translateY(0) scale(1);}
            }
            .admin-msg {
              background: rgba(255,255,255,0.97);
              border-radius: 18px;
              box-shadow: 0 8px 32px rgba(40,62,81,0.13);
              padding: 44px 32px;
              max-width: 400px;
              width: 100%;
              text-align: center;
              font-size: 1.3rem;
              font-weight: 700;
              color: #e53935;
              letter-spacing: 1px;
              animation: fadeInAdmin 1.2s;
            }
          `}
        </style>
        <div className="admin-msg">
          Unauthorized Access<br />
          You do not have permission to view this page.
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
