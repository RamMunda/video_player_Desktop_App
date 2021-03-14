const { BrowserWindow, Menu, ipcMain } = require('electron');
const electron = require('electron');
const { app, dialog} = electron;
let MainWindow,subtitleWindow;

let template = [
    { label : "Media", submenu:[{ label : "Open file", 
    icon : '',
    accelerator:process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',

      
      click(){
          dialog.showOpenDialog({
            defaultPath: app.getPath('desktop'),
            buttonLabel : 'Select File',
            properties:['openFile'],
            filters : [ { name :'movies', extensions:['mp4','webm','mkv']}]
          }).then(fileURLToPath =>{
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
    { label : "Audio", submenu:[{ label : "Audio Track"},{ label : "Audio Device"},{ label : "Stero Mode"},{ label : "Increase Volume"},{ label : "Decrease Volume"},{ label : "Mute"}]},
    { label : "Video", submenu:[{ label : "Video Track",submenu : [ { label : "track-1"},{ label : "track-2"}]},{ label : "Fullscreen"},{ label : "Zoom"},{ label : "Aspect Ratio"},{ label : "Crop"},{ label : "Deinterface"},{ label : "Deinterface mode"},{ label : "Take Snaoshot"}]},
    { label : "Subtitle", submenu:[{ label : "Add Subtitle link..",
      click(){
          subtitleWindow = new BrowserWindow({
            height:200,
            width :300,
            webPreferences :{
              nodeIntegration : true
            }
          })
        subtitleWindow.loadFile('subtitleWindow.html');
      
    }
    },
    { label : "Add subtitle file",
    click(){
      dialog.showOpenDialog({
        defaultPath: app.getPath('desktop'),
        buttonLabel : 'Select File',
        properties:['openFile']
      }).then(fileURLToPath =>{
          MainWindow.webContents.send('subtitle_file_path',fileURLToPath);
        })
    
    }

    },
    { label : "Sub track"}]},
    { label : "tool", submenu:[{ label : "open file"},{ label : "open multilpe file"},{ label : "open folder"}]},
    { label : "Help", submenu:[{ label : "Help"},{ label : "Check for update"},{ label : "About"}]}

]
app.on('ready',()=>{
    MainWindow = new BrowserWindow({
         webPreferences :{
             nodeIntegration : true
         },
         icon:__dirname+'asset/solid.svg',
         "text-areas-are-resizable":false 
    });
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    MainWindow.loadFile('main.html');
    // MainWindow.webContents.openDevTools();
});

ipcMain.on('subtitlePathUrl',(event,arg)=>{
  MainWindow.webContents.send('sendsubtitlePathUrl',arg);
  subtitleWindow.close();
});