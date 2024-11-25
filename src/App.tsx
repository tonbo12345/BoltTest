import React, { useState } from 'react';
import { Upload, FileUp, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { WordList } from './components/WordList';
import { Instructions } from './components/Instructions';
import type { WordData } from './types';

function App() {
  const [words, setWords] = useState<WordData[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイル拡張子チェック
    if (!file.name.match(/\.(xlsx|xlsm)$/)) {
      setError('xlsxまたはxlsmファイルのみアップロード可能です。');
      return;
    }

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      
      // エクセルデータを配列に変換
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // データの形式を整える
      const formattedData: WordData[] = jsonData.map((row: any, index) => ({
        id: index + 1,
        word: row['英単語'] || '',
        meaning: row['意味'] || '',
        example: row['例文'] || '',
        imageUrl: row['画像URL'] || '',
        notes: row['メモ'] || '',
      }));

      setWords(formattedData);
      setError('');
    } catch (err) {
      setError('ファイルの読み込み中にエラーが発生しました。');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileUp className="w-8 h-8" />
            英単語登録アプリ
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Instructions />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">クリックしてファイルを選択</span>
                  またはドラッグ＆ドロップ
                </p>
                <p className="text-xs text-gray-500">XLSX, XLSM</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xlsm"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {words.length > 0 && <WordList words={words} />}
      </main>
    </div>
  );
}

export default App;