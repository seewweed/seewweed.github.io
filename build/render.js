const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

// プロジェクトのルートを取得
const projectRoot = path.join(__dirname, "..");

// 各ディレクトリのパス
const ejsDir = path.join(projectRoot, "views", "ejs");       // テンプレート
const includesRoot = path.join(projectRoot, "views");        // include の起点にする
const htmlDir = path.join(projectRoot, "html");              // 出力先

// ページの定義
const pages = [
    {
        template: "index.ejs",
        output: "index/index.html",
        variables: {
        title: "Retros - index",
        heading: "4th Base"
        }
    },
    {
        template: "about.ejs",
        output: "about/about.html",
        variables: {
        title: "Retros - About",
        heading: "Check Me Out!"
        }
    },
                {
        template: "research.ejs",
        output: "research/research.html",
        variables: {
        title: "Retros - Research",
        heading: "Research"
        }
    },
    {
        template: "works.ejs",
        output: "works/works.html",
        variables: {
        title: "Retros - Works",
        heading: "Works"
        }
    },
    {
        template: "interest.ejs",
        output: "interest/interest.html",
        variables: {
        title: "Retros - Interest",
        heading: "Interest"
        }
    },
    {
        template: "blog.ejs",
        output: "blog/blog.html",
        variables: {
        title: "Retros - Blog",
        heading: "Blog"
        }
    },
    {
        template: "article.ejs",
        output: "blog/article.html",
        variables: {
        title: "Retros - Article",
        heading: "Article"
        }
    },
            {
        template: "gallery.ejs",
        output: "gallery/gallery.html",
        variables: {
        title: "Retros - Gallery",
        heading: "Gallery"
        }
    },
    {
        template: "contact.ejs",
        output: "contact/contact.html",
        variables: {
        title: "Retros - Contact",
        heading: "Contact"
        }
    }
];

console.log("🛠️ HTML出力処理を開始...");

pages.forEach((page) => {
    const inputPath = path.join(ejsDir, page.template);
    const outputPath = path.join(htmlDir, page.output);

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    ejs.renderFile(
        inputPath,
        page.variables,
        {
            root: includesRoot, // ✅ views/ が include の起点になる
        },
        (err, str) => {
        if (err) {
            console.error(`❌ ${page.output} の生成に失敗:`, err.message);
            return;
        }
        fs.writeFileSync(outputPath, str);
        console.log(`✅ ${page.output} を出力しました`);
        }
    );
});
