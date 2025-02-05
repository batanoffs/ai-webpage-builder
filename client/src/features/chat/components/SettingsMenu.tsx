import { ChangeEvent } from 'react';
import { useAiContext } from '../../../shared';

export const SettingsMenu = () => {
    const { setAiSettings, aiSettings, isOpenModal, toggleSettingsModal } = useAiContext();

    if (!isOpenModal) return null;

    const saveSettingsHandler = (event: React.FormEvent) => {
        event.preventDefault();
        // TODO - send success notification
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        let value: string | number = e.target.value;

        console.log('name', typeof name, name);

        // Convert temperature to number, keep others as string
        if (name === 'temperature') {
            value = parseFloat(value);
        }

        setAiSettings((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                    <button
                        onClick={toggleSettingsModal}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form onSubmit={saveSettingsHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
                        <input
                            type="password"
                            name="apiKey"
                            id="apiKey"
                            value={aiSettings.apiKey}
                            onChange={onChangeHandler}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            placeholder="sk-..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Temperature</label>
                        <input
                            type="range"
                            name="temperature"
                            id="temperature"
                            min="0"
                            max="2"
                            step="0.1"
                            value={aiSettings.temperature}
                            onChange={onChangeHandler}
                            className="mt-1 block w-full"
                        />
                        <div className="text-sm text-gray-500 mt-1">Value: {aiSettings.temperature}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Model</label>
                        <select
                            name="model"
                            id="model"
                            value={aiSettings.model}
                            onChange={onChangeHandler}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            {/* TODO - validate with OPEN ai docs */}
                            <option value="gpt-3.5-turbo">GPT-3.5-turbo</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="gpt-4o-mini">GPT-4o-mini</option>
                            <option value="gpt-o1">GPT-o1</option>
                            <option value="gpt-o1-mini">GPT-o1-mini</option>
                            <option value="gpt-o1-preview">GPT-o1-preview</option>
                            <option value="gpt-o3-mini">GPT-o3-mini</option>
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end mt-6">
                        <button
                            type="button"
                            onClick={toggleSettingsModal}
                            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
