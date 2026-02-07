/*
 * EMARATI SHOW - V13 (PRECISION CUT - AUTO SELECT)
 * Generated for Guest:
 */

// =========================================================
//  1. CONFIGURATION
// =========================================================

// Global variable to hold guest name, can be updated from client side if needed
var GUEST_NAME = "";
var ASSETS_PATH = "H:/shara imarati 2023/tools ai/";

function startAutoCut() {
    app.enableQE();
    var project = app.project;

    // Prompt user to select the Guest Footage folder
    var targetFolder = Folder.selectDialog("📂 Select Guest Footage Folder for " + GUEST_NAME);

    if (targetFolder) {
        buildEpisodeV13(targetFolder);
        return "Started AutoCut for folder: " + targetFolder.fsName;
    } else {
        return "User cancelled folder selection.";
    }
}


function buildEpisodeV13(folder) {
    var project = app.project;
    // A. SETUP SEQUENCE
    var seqName = (GUEST_NAME ? GUEST_NAME.replace(/[^a-zA-Z0-9]/g, '_') : "Guest") + "_V13_AutoCut";
    var seq = project.createNewSequence(seqName, "");
    var v1 = seq.videoTracks[0]; // Main Interview
    var v2 = seq.videoTracks[1]; // Outro & Rushes
    var v3 = seq.videoTracks[2]; // Graphics
    var a3 = seq.audioTracks[2]; // Music

    // B. IMPORT ASSETS & FOOTAGE
    var binAssets = getOrCreateBin("00_ASSETS");
    var binGuest  = getOrCreateBin("01_GUEST_FILES");

    // Import fixed assets based on standard naming
    var intro  = importAsset(ASSETS_PATH, "shara", binAssets);
    var outro  = importAsset(ASSETS_PATH, "kharima", binAssets);
    var logo   = importAsset(ASSETS_PATH, "bug", binAssets);
    var lower  = importAsset(ASSETS_PATH, "lawer third", binAssets);
    var music  = importAsset(ASSETS_PATH, "music", binAssets);

    // Import guest footage
    project.importFiles(getMediaFiles(folder), true, binGuest, false);

    // C. SORT & CATEGORIZE
    var rushes = [], interview = [], items = binGuest.children;
    for (var i = 0; i < items.numItems; i++) {
        if (items[i].type === ProjectItemType.CLIP && !isImage(items[i].name)) {
            var dur = items[i].getOutPoint().seconds - items[i].getInPoint().seconds;
            // Logic: Clips < 15s are treated as B-Roll/Rushes, others as Main Interview
            (dur < 15.0) ? rushes.push(items[i]) : interview.push(items[i]);
        }
    }
    // Sort interview clips alphanumerically
    interview.sort(function(a,b){return a.name.localeCompare(b.name, undefined, {numeric:true})});

    var cursor = 0.0;

    // D. ASSEMBLE TIMELINE

    // -- INTRO --
    if (intro) {
        v1.overwriteClip(intro, cursor);
        cursor += getDur(intro);
    } else {
        cursor += 5.0; // Safety buffer
    }
    var montageStart = cursor;

    // -- RUSHES (B-Roll) on V2 --
    for (var r = 0; r < rushes.length; r++) {
        v2.overwriteClip(rushes[r], cursor);
        muteAudioAt(seq, cursor); // Mute B-Roll
        cursor += 2.0; // Fast 2-second cuts
    }
    var interviewStart = cursor;

    // -- INTERVIEW on V1 --
    for (var k = 0; k < interview.length; k++) {
        v1.overwriteClip(interview[k], cursor);
        cursor += getDur(interview[k]);
    }

    var interviewEnd = cursor;

    // E. OUTRO & MUSIC SYNC (V13 LOGIC)

    var overlapTime = 2.0;

    // Place Outro with 2s overlap
    if (outro) {
        var outroStartTime = interviewEnd - overlapTime;
        v2.overwriteClip(outro, outroStartTime);
    }

    // Music Automation
    if (music) {
        a3.overwriteClip(music, montageStart);
        var mClip = getClipAt(a3, montageStart + 0.5);

        if (mClip && mClip.end.seconds > interviewStart) {
            var param = mClip.components[0].properties[0]; // Volume Parameter
            if (param) {
                param.setTimeVarying(true);

                // Ducking at start of interview (fade down to 0.15)
                param.addKey(interviewStart - 0.5); param.setValueAtKey(interviewStart - 0.5, 1.0, 1);
                param.addKey(interviewStart + 1.0); param.setValueAtKey(interviewStart + 1.0, 0.15, 1);

                // Swell at end (fade up to 1.0 at precise end)
                param.addKey(interviewEnd - overlapTime);
                param.setValueAtKey(interviewEnd - overlapTime, 0.15, 1);

                param.addKey(interviewEnd);
                param.setValueAtKey(interviewEnd, 1.0, 1);
            }

            // Trim music to sequence end
            var totalEnd = parseFloat(seq.end);
            if (mClip.end.seconds > totalEnd) {
                 var endT = new Time(); endT.seconds = totalEnd; mClip.end = endT;
            }
        }
    }

    // -- GRAPHICS --
    if (lower) v3.overwriteClip(lower, 20.0); // Enter at 00:20
    if (logo) {
        v3.overwriteClip(logo, 0);
        var lClip = getClipAt(v3, 0.1);
        if (lClip) { var endT = new Time(); endT.seconds = parseFloat(seq.end); lClip.end = endT; }
    }

    alert("✅ V13 Sequence Complete: " + seqName);
}

// =========================================================
//  3. HELPER FUNCTIONS
// =========================================================

function getOrCreateBin(name) { var r = app.project.rootItem; for(var i=0;i<r.children.numItems;i++) if(r.children[i].name==name) return r.children[i]; return r.createBin(name); }

function importAsset(path, name, bin) {
    var exts = [".mp3",".wav",".mp4",".mov",".png",".mxf",".jpg"];
    for(var i=0;i<exts.length;i++){
        var f=new File(path + name + exts[i]);
        if(f.exists){
            app.project.importFiles([f.fsName],1,bin,0);
            return bin.children[bin.children.numItems-1];
        }
    }
    return null;
}

function getMediaFiles(fldr) {
    var f=fldr.getFiles();
    var p=[];
    for(var i=0;i<f.length;i++) {
        // Regex to match video files
        if(f[i] instanceof File && f[i].name.match(/\.(mp4|mov|mxf|mts|mpg)$/i)) {
            p.push(f[i].fsName);
        }
    }
    return p;
}

function isImage(n) { return (n.indexOf(".jpg")>-1 || n.indexOf(".png")>-1 || n.indexOf(".wav")>-1 || n.indexOf(".mp3")>-1); }

function getDur(item) { return item.getOutPoint().seconds - item.getInPoint().seconds; }

function getClipAt(track, time) { for(var i=0;i<track.clips.numItems;i++) if(track.clips[i].start.seconds<=time && track.clips[i].end.seconds>=time) return track.clips[i]; return null; }

function muteAudioAt(seq, time) {
    // Removes audio clips on first 2 tracks at the specific time cursor
    for(var i=0;i<Math.min(seq.audioTracks.numTracks, 2);i++) {
        var t=seq.audioTracks[i];
        for(var j=0;j<t.clips.numItems;j++) {
            if(Math.abs(t.clips[j].start.seconds-time)<0.1) {
                t.clips[j].remove(0,0);
                break;
            }
        }
    }
}
