import { Spinner } from './Spinner';

export const Loading = () => (
    <div className="absolute bottom-24 inset-x-4 flex items-center justify-center gap-3 py-2 z-10">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-[2px] shadow-sm">
            <Spinner />
            <span className="text-sm font-medium text-gray-600">Thinking...</span>
        </div>
    </div>
);
