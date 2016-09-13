var gulp = require("gulp"),

    //jade模块
    jade = require("gulp-jade"),
    htmlmin = require("gulp-htmlmin"),
    rev = require("gulp-rev-append"),

    // less模块
    less = require("gulp-less"),
    cssmin = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    cssver = require("gulp-make-css-url-version"),

    //coffee模块
    coffee = require("gulp-coffee"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    // coffeeify = require("coffeeify"),

    //图片模块
    // imagemin = require("gulp-imagemin"),
    // cache = require("gulp-cache"),
    // pngquant = require('imagemin-pngquant'),

    gutil = require("gulp-util"),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    clean = require("gulp-clean"),
    // browserify = require("gulp-browserify"),
    extReplace = require("gulp-ext-replace"),

    //刷新,重启模块
    // livereload = require("gulp-livereload"),
    // nodemon = require("gulp-nodemon")
    electron = require("electron-connect").server.create()

//一些文件的路径
// var paths = {
//     client: [
//         "public/src/coffee/**/*.coffee",
//         "public/src/less/**/*.less",
//         "views/**/*.jade"
//     ],
//     server: {
//         index: 'server.coffee'
//     }
// }

//nodemon的配置
// var nodemonConfig = {
//     script: paths.server.index,
//     ext: "coffee",
//     ignore: [
//         "public/**",
//         "views/**"
//     ],
//     env: {
//         "NODE_ENV": "development"
//     }
// }

/*
    编译jade,压缩,添加版本号
    步骤:
        编译jade -> 压缩 -> 添加版本号 -> 输出到文件 -> 提醒任务完成
*/
gulp.task("jade", function(){

    var opt = {
        // removeComments: true, //消除评论
        // collapseWhitespace: true, //压缩HTML
        // collapseBooleanAttributes: true, //省略布尔属性的值 <inpit checked="true" /> ==> <input />
        // removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        // removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        // removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        // minifyJS: true, //压缩页面JS
        // minifyCSS: true //压缩页面CSS
    };

    gulp.src("public/src/html/*.jade")
        .pipe(jade())
        // .pipe(htmlmin(opt))
        // .pipe(rev())
        .pipe(gulp.dest("app/html"))
        // .pipe(notify({message: "Jade task complete"}))
})


/*
    编译less,自动添加css前缀和压缩
    步骤:
        编译less -> 添加前缀 -> 重命名.min -> 压缩css -> 输出到文件 -> 提醒任务完成
*/
gulp.task("less", function(){
    var autoprefixerOpt = {
        browsers: ["last 2 versions"],
        cascade: true, //是否美化属性值 默认true 像这样
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove: true //是否去掉不必要的前缀 默认:true
    }

    gulp.src("public/src/less/**/*.less")
        .pipe(less())
        .pipe(autoprefixer(autoprefixerOpt))
        // .pipe(gulp.dest("dist/assets/css"))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(cssmin())
        .pipe(gulp.dest("app/css"))
        // .pipe(notify({message: "Less task complete"}))
})

/*
    编译coffee,压缩，合并
    步骤:
        使用browserify处理coffee的依赖关系 -> 编译coffee -> 压缩 -> 重命名.min -> 合并
*/
gulp.task("coffee", function(){

    var opt = {
        mangle: true, //类型：Boolean 默认：true 是否修改变量名
        compress: true //类型：Boolean 默认：true 是否完全压缩
    }

    gulp.src('public/src/coffee/**/*.coffee')
        // .pipe(browserify({
        //   transform: ['coffeeify'],
        //   extensions: ['.coffee']
        // }))
        .pipe(coffee({bare: true})).on("error", gutil.log)
        // .pipe(extReplace(".js"))
        // .pipe(uglify(opt))
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("app/js"))
        // .pipe(notify({message: "Coffee task complete"}))
})

/*
    清除生成文件
*/
gulp.task("clean", function(){
    gulp.src(["public/dist/assets"],{read:false})
        .pipe(clean())
        .pipe(notify({message: "Clean task complete"}));
})

// 压缩图片
// gulp.task("Imagemin", function(){
//     var opt = {
//         optimizationLevel: 5, //类型：NUMBER 默认：3 范围0-7，优化等级
//         progressive: true, //类型：BOOLEAN 默认：false 无损压缩jpg
//         interlaced: true, //类型：BOOLEAN 默认：false 隔行扫描gif进行渲染
//         multipass: true //类型：BOOLEAN 默认：false 多次优化svg知道完全优化
//     }
//     gulp.src("public/src/img/*.{png,jpg,gif,ico}")
//         .pipe(imagemin(opt))
//         .pipe(gulp.dest("public/dist/assets/img"));
// });
//只压缩修改过的图片，没有修改的直接从缓存文件读取
// gulp.task("Imagemin", function(){
//     var opt = {
//         pregressive: true,
//         svgoPlugins: [{removeViewBox: false}],
//         use: [pngquant()]
//     }
//     gulp.src("public/src/img/*.{png,jpg,gif,ico}")
//         .pipe(cache(imagemin(opt)))
//         .pipe(gulp.dest("public/dist/assets/img"));
// });

/*
    将bower_components中需要的文件提取出来
*/
// gulp.task("refBowerComponents", function(){
//     gulp.src("public/src/lib/bower_components/jquery/dist/jquery.min.js")
//         .pipe(gulp.dest("public/dist/lib/jquery"))
//         .pipe(notify({message: "Bower_components task complete"}));
// })


//使用nodemon启动服务器
gulp.task('server', ["watch"], function(){
    // return nodemon(nodemonConfig);
    electron.start();
    gulp.watch('main.js', electron.restart)
})

//livereload
// gulp.task("livereload", function(){
//  livereload.listen();
//  var server = livereload()
//  return gulp.watch(paths.client, function(event){
//      server.changed(event.path);
//  })
// })

// 默认执行入口
// gulp.task("default", ["clean", "less", "coffee"], function(){
//  // gulp.start("jade", "less", "coffee");
// });

gulp.task("default", ["less", "coffee", "jade", "server"])

// gulp.task("reload", function(){
//
// })

//监听
gulp.task("watch", function(){

    // watch jade modify
    gulp.watch("public/src/html/*.jade", ["jade"]);

    //watch less modify
    gulp.watch("public/src/less/**/*.less", ["less"]);

    //watch coffee modify
    gulp.watch("public/src/coffee/**/*.coffee", ["coffee"]);

    //watch img modify
    // gulp.watch("public/src/img/*.{png,jpg,gif,ico}", ["Imagemin"]);

    //watch lib modify
    // gulp.watch("public/src/lib/**", ["refBowerComponents"]);

    //create livereload server
    // livereload.listen();

    //watch dist any files change
    /*
        监听某个目录下的文件时,应该保证那个文件存在
        如果一开始启动的时候,不存在app文件夹,那么针对app的reload便不会发生
    */
    gulp.watch(["app/**/**"]).on("change", electron.reload);
    // Restart browser process
    // gulp.watch('app/**/**', electron.reload);
})

gulp.task('move', function(){
    gulp.src(
        [   'app/**/**', 'main/**',
            'node_modules/electron/**/**',
            'node_modules/electron-connect/**/**',
            'node_modules/nconf/**/**',
            'main.js',
            'package.json'
        ], {
            base: './'
        }
    ).pipe(gulp.dest('dist'))
})

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
