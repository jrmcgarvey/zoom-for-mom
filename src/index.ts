//import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon } from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
import {exec} from 'child_process';
import WebSocket from 'ws';
import dotenv from 'dotenv';

// const win = new QMainWindow();
// win.setWindowTitle("Hello World");

// const centralWidget = new QWidget();
// centralWidget.setObjectName("myroot");
// const rootLayout = new FlexLayout();
// centralWidget.setLayout(rootLayout);

// const label = new QLabel();
// label.setObjectName("mylabel");
// label.setText("Hello");

// const button = new QPushButton();
// button.setIcon(new QIcon(logo));

// const label2 = new QLabel();
// label2.setText("World");
// label2.setInlineStyle(`
//   color: red;
// `);

// rootLayout.addWidget(label);
// rootLayout.addWidget(button);
// rootLayout.addWidget(label2);
// win.setCentralWidget(centralWidget);
// win.setStyleSheet(
//   `
//     #myroot {
//       background-color: #009688;
//       height: '100%';
//       align-items: 'center';
//       justify-content: 'center';
//     }
//     #mylabel {
//       font-size: 16px;
//       font-weight: bold;
//       padding: 1;
//     }
//   `
// );
// win.show();

// (global as any).win = win;


import { QMessageBox, ButtonRole, QPushButton, WindowState } from '@nodegui/nodegui';
const messageBox = new QMessageBox();
messageBox.setText('John has invited you to the McGarvey Family Zoom meeting.')
const zoomButton = new QPushButton();
const cancelButton = new QPushButton();
zoomButton.setText('Start the Zoom Meeting');
cancelButton.setText('Cancel');
messageBox.addButton(cancelButton,ButtonRole.RejectRole);
messageBox.addButton(zoomButton,ButtonRole.AcceptRole);

messageBox.setWindowTitle("McGarvey Family Zoom");
const sureBox = new QMessageBox();
const yesButton = new QPushButton();
const noButton = new QPushButton();
noButton.setText("No");
yesButton.setText("Yes");
sureBox.setWindowTitle("McGarvey Family Zoom");
sureBox.setText("Are you sure you want to cancel and not start Zoom?");
sureBox.addButton(yesButton,ButtonRole.AcceptRole);
sureBox.addButton(noButton,ButtonRole.RejectRole);
dotenv.config();
declare var process : {
  env: {
    CONNECT_URL: string
  }
}
let ws = new WebSocket(process.env.CONNECT_URL);
let isAlive=true;
setInterval(()=> { 
  if (!isAlive) {
    //ws.terminate()
    // ws = new WebSocket(process.env.CONNECT_URL);
  } else {
    isAlive=false;
    ws.ping()
  }
},30000)
ws.on('pong',()=> {
  isAlive=true;
})


let decision;
do {
  messageBox.setModal(true);
  messageBox.setWindowState(WindowState.WindowActive);
  //messageBox.setDefaultButton(zoomButton);
  decision = messageBox.exec();
  let sure;
  if (!decision) {
    sureBox.setModal(true);
    //sureBox.setDefaultButton(noButton);
    sure = sureBox.exec();
    console.log("sure: ", sure)
    if (sure) {
        break;
    }
  } else {
    break;
  }
} while (true);
console.log("decision: ", decision)