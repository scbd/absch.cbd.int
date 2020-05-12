
define(['app', 'json!https://cdn.cbd.int/mime-db@1.44.0/db.json', 'lodash'], function(app, mimedb, _) {
    'use strict';

    app.factory("MimeService", [function() {

        var mimeCache={};
        function lookup(name){
            var fileExt = getFileExtension(name);

            if(mimeCache[fileExt])
                return mimeCache[fileExt];

            var mime = _.findKey(mimedb, function(mime){
                return _.includes(mime.extensions, fileExt)
            });
            
            mimeCache[fileExt] = mime;

            return mime
        }

        function mimeIcon(mime) {
            var mimeIcons = {
                // Media
                image: "fa-file-image-o",
                audio: "fa-file-audio-o",
                video: "fa-file-video-o",
                // Documents
                "application/pdf": "fa-file-pdf-o",
                "application/msword": "fa-file-word-o",
                "application/vnd.ms-word": "fa-file-word-o",
                "application/vnd.oasis.opendocument.text": "fa-file-word-o",
                "application/vnd.openxmlformats-officedocument.wordprocessingml":
                "fa-file-word-o",
                "application/vnd.ms-excel": "fa-file-excel-o",
                "application/vnd.openxmlformats-officedocument.spreadsheetml":
                "fa-file-excel-o",
                "application/vnd.oasis.opendocument.spreadsheet": "fa-file-excel-o",
                "application/vnd.ms-powerpoint": "fa-file-powerpoint-o",
                "application/vnd.openxmlformats-officedocument.presentationml":
                "fa-file-powerpoint-o",
                "application/vnd.oasis.opendocument.presentation": "fa-file-powerpoint-o",
                "text": "fa-file-text-o",
                "text/plain": "fa-file-text-o",
                "text/html": "fa-file-code-o",
                "application/json": "fa-file-code-o",
                // Archives
                "application/gzip": "fa-file-archive-o",
                "application/zip": "fa-file-archive-o"
            }
            var icon;
            
            if(mime)
                icon = mimeIcons[mime];
            
            if(!icon){
                var mimeBase = mime.split('/')[0]
                icon = mimeIcons[mimeBase]
            }

            return icon;
        }

        function getFileExtension(file) {
            var regexp = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            var extension = file.match(regexp);
            return extension && extension[1];
        }
        return {
            lookup:lookup,
            mimeIcon, mimeIcon
        };
    }]);

});
