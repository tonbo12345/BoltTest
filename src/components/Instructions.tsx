import React from 'react';
import { Info } from 'lucide-react';

export function Instructions() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
      <div className="flex items-start">
        <Info className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-lg font-semibold text-blue-800 mb-2">使用方法</h2>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>エクセルファイル（.xlsxまたは.xlsm）を準備してください</li>
            <li>以下のカラムを含むようにしてください：
              <ul className="list-disc list-inside ml-4 text-sm">
                <li>英単語</li>
                <li>意味</li>
                <li>例文（任意）</li>
                <li>画像URL（任意）</li>
                <li>メモ（任意）</li>
              </ul>
            </li>
            <li>ファイルをドラッグ＆ドロップするか、クリックして選択してください</li>
            <li>アップロードされたデータは下部に表示されます</li>
          </ul>
        </div>
      </div>
    </div>
  );
}