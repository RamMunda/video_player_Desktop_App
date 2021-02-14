const { BrowserWindow, Menu } = require('electron');
const electron = require('electron');
const { app, dialog} = electron;
let MainWindow;


let template = [
    { label : "Media", submenu:[{ label : "Open file", 
    icon : '',
    accelerator:process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',

      
      click(){
          dialog.showOpenDialog({
            defaultPath: app.getPath('desktop'),
            buttonLabel : 'Select File',
            properties:['openFile']
          }).then(fileURLToPath =>{
              console.log(fileURLToPath);
              MainWindow.webContents.send('file_path',fileURLToPath);
            })
        
      }
    },
    { label : "Open multilpe file",accelerator:process.platform == 'darwin' ? 'Command+Shift+O' : 'Ctrl+Shift+O'},
    { label : "Open folder",accelerator:process.platform == 'darwin' ? 'Command+F' : 'Ctrl+F'},
    { label : "Open disc",accelerator:process.platform == 'darwin' ? 'Command+D' : 'Ctrl+D'},
    { label : "Open Network Playlist",accelerator:process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N'},
    { label : "Quit" , role:"quit",accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q'},
    { label : "Reload" , role:"reload",accelerator:process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R'}

  ]},
    { label : "Playback", submenu:[{ label : "Play",
    accelerator:process.platform == 'darwin' ? 'Command+Shift+P' : 'Ctrl+Shift+P',
      click(){
        MainWindow.webContents.send('playorStopMessage',"play");
      } 
    },
    { label : "Pause",
    accelerator:process.platform == 'darwin' ? 'Command+Shift+S' : 'Ctrl+Shift+S',

      click(){
        MainWindow.webContents.send('playorStopMessage',"stop");
    }  
    },
    { label : "Preview", role :"undo"},{ label : "Next",
    accelerator:process.platform == 'darwin' ? 'Command+Shift+N' : 'Ctrl+Shift+N',
  
    },
    { label : "Record",
    accelerator:process.platform == 'darwin' ? 'Command+Shift+R' : 'Ctrl+Shift+R',

    }]},
    { label : "Audio", submenu:[{ label : "open file"},{ label : "open multilpe file"},{ label : "open folder"}]},
    { label : "Video", submenu:[{ label : "open file"},{ label : "open multilpe file"},{ label : "open folder"}]},
    { label : "Subtitle", submenu:[{ label : "open file"},{ label : "open multilpe file"},{ label : "open folder"}]},
    { label : "tool", submenu:[{ label : "open file"},{ label : "open multilpe file"},{ label : "open folder"}]},
    { label : "Help", submenu:[{ label : "open file"},{ label : "open multilpe file"},{ label : "open folder"}]}

]
app.on('ready',()=>{
    MainWindow = new BrowserWindow({
         webPreferences :{
             nodeIntegration : true
         }   
    });
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    MainWindow.loadFile('main.html');
    MainWindow.webContents.openDevTools();
});