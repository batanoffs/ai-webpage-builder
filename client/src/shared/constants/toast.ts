import toast, { Toast, ToastOptions } from 'react-hot-toast';

interface CustomToastOptions extends ToastOptions {
    onClick?: (toast: Toast) => void;
}

export const toastOptions: { error: CustomToastOptions } = {
    error: {
        duration: 8000, // Make toast persistent

        style: {
            background: '#FEE2E2',
            color: '#991B1B',
            maxWidth: '420px',
            wordBreak: 'break-word' as const,
            whiteSpace: 'pre-wrap',
            cursor: 'pointer',
            padding: '1rem',
        },
        onClick: (t) => toast.dismiss(t.id), // Dismiss on click
    },
};
