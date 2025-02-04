import { PropsWithChildren } from 'react';

export const AppLayout = ({ children }: PropsWithChildren) => {
    return <main className="flex">{children}</main>;
};
