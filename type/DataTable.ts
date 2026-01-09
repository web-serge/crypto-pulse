import { Key, ReactNode } from 'react';

export type DataTableColumn<T> = {
    header: ReactNode;
    cell: (row: T, index: number) => ReactNode;
    headClassName?: string;
    cellClassName?: string;
};

export type DataTableProps<T> = {
    columns: DataTableColumn<T>[];
    data: T[];
    rowKey: (row: T, index: number) => Key;
    tableClassName?: string;
    headerClassName?: string;
    headerRowClassName?: string;
    headerCellClassName?: string;
    bodyRowClassName?: string;
    bodyCellClassName?: string;
};
