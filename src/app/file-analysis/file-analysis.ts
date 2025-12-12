import { Component,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-analysis',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './file-analysis.html',
  styleUrl: './file-analysis.css',
})
export class FileAnalysis {

  file: File | null = null;
  sheetList: string[] = [];
  columnList: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}


  selectedSheet = '';
  selectedColumn = '';
  selectedModel = 'GPT-4.1';
  chatMessages: any[] = [];

  onFileSelected(event: any) {
    this.selectedSheet = '';
    this.file = event.target.files[0];
    if (!this.file) return;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      this.sheetList = workbook.SheetNames;
      this.cdr.detectChanges(); // บอก Angular ให้ refresh ทันที
    };

    reader.readAsArrayBuffer(this.file);
  }
  onSheetSelected(firstSheetName: string) {
    this.selectedColumn = '';

    if (!this.file) return;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
      this.columnList = json[0]; // แถวแรกคือ header
      this.cdr.detectChanges(); //บอก Angular ให้ refresh ทันที
    };

    reader.readAsArrayBuffer(this.file);
  }

  
  sendMessage(message: string) {
    if (!message.trim()) return;

    this.chatMessages.push({ type: 'user', text: message });

    // ยิง API model
    // TODO:
    setTimeout(() => {
      this.chatMessages.push({
        type: 'bot',
        text: 'ขอบคุณสำหรับคำถาม เดี๋ยววิเคราะห์ให้นะ'
      });
    }, 500);
  }

}
