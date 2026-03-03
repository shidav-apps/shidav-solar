import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-site',
  imports: [],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export default class SiteComponent {

  readonly fileContent = signal('');

  async readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as ArrayBuffer);
      reader.onerror = rej;

      reader.readAsArrayBuffer(file);
    })
  }

  async downloadFile(file: File) {
    const url = URL.createObjectURL(file);
    const hiddenElement = document.createElement('a');
    hiddenElement.target = '_blank';
    hiddenElement.download = 'myPdf.pdf';
    hiddenElement.href = url;
    hiddenElement.click();
    
  }


  async onFileChosen(ev: any) {
    const file = ev.target.files[0] as File;
    if (!file) return;

    // // for text files
    // const txt = await file.text();
    // this.fileContent.set(txt);


    // for binary files
    const content = await this.readFile(file);
    const fileType = file.type;
    const intArray = new Uint8Array(content);

    // create a file FROM binary array
    const blob = new Blob([intArray], { type: fileType});
    const newFile = new File([blob], 'newFile.pdf', { type: fileType});

    // download the file
    await this.downloadFile(newFile);



  }

}
