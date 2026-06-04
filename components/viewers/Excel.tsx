import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ExcelJS from 'exceljs';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export type ExcelProps = {
  url: string;
};

type SheetData = {
  cols: { field: string; headerName: string }[];
  rows: Record<string, unknown>[];
};

async function loadWorkbook(url: string): Promise<ExcelJS.Workbook> {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  return workbook;
}

function extractSheetData(ws: ExcelJS.Worksheet): SheetData {
  const headerRow = ws.getRow(1);
  const headers: string[] = [];
  headerRow.eachCell({ includeEmpty: true }, (cell) => {
    headers.push(String(cell.value ?? ''));
  });

  const cols = headers.map((h, i) => ({ field: `col_${i}`, headerName: h }));

  const rows: Record<string, unknown>[] = [];
  ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowData: Record<string, unknown> = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      rowData[`col_${colNumber - 1}`] = cell.value;
    });
    rows.push(rowData);
  });

  return { cols, rows };
}

export function Excel({ url }: ExcelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [workbook, setWorkbook] = useState<ExcelJS.Workbook | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const [sheetData, setSheetData] = useState<SheetData>({ cols: [], rows: [] });

  useEffect(() => {
    setIsLoading(true);
    loadWorkbook(url).then((wb) => {
      const names = wb.worksheets.map((ws) => ws.name);
      setWorkbook(wb);
      setSheetNames(names);
      if (names[0]) {
        setActiveSheet(names[0]);
        setSheetData(extractSheetData(wb.getWorksheet(names[0])!));
      }
      setIsLoading(false);
    });
  }, [url]);

  const selectSheet = (name: string) => {
    if (!workbook) return;
    setActiveSheet(name);
    setSheetData(extractSheetData(workbook.getWorksheet(name)!));
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center w-[600px] h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={sheetData.rows}
          columnDefs={sheetData.cols}
          defaultColDef={{
            resizable: true,
            minWidth: 200,
            flex: 1,
            sortable: true,
            filter: true,
          }}
        />
      </div>
      <div className="border-t">
        {sheetNames.map((name, idx) => (
          <button
            key={idx}
            className={`text-sm px-3 pb-2 pt-4 border-b border-l border-r ${
              name === activeSheet ? 'font-semibold' : ''
            }`}
            onClick={() => selectSheet(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
