var photos = [];

function getCSV() {
	var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
	req.open("get", "../data/default.csv", true); // アクセスするファイルを指定
	req.send(null); // HTTPリクエストの発行

	// レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
	req.onload = function () {
		convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
	};
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str) {
	// 読み込んだCSVデータが文字列として渡される
	var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

	// 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
	for (var i = 0; i < tmp.length; ++i) {
		photos[i] = tmp[i].split(",");
	}
}

// 描画する
function draw() {
	var boards = document.getElementsByClassName("boards")[0];

	for (var i = 0; i < photos.length; i++) {
		// 値（氏名）がない場合はスキップする
		if (photos[i][2] == "") {
			continue;
		}

		// ボードを生成
		var board = document.createElement("div");
		board.className = "board";

		var caption = document.createElement("div");
		caption.className = "caption";

		var title = document.createElement("h1");
		title.textContent = photos[i][0];

		var description = document.createElement("p");
		description.textContent = photos[i][1];

		var nameAndGrade = document.createElement("p");
		nameAndGrade.className = "nameAndGrade";
		nameAndGrade.textContent = photos[i][2] + "　" + photos[i][3] + "回生";

		var tonbo = document.createElement("img");
		tonbo.src = "./assets/tonbo.svg";

		caption.insertBefore(title, null);
		caption.insertBefore(description, null);

		board.insertBefore(caption, null);
		board.insertBefore(nameAndGrade, null);
		board.insertBefore(tonbo, null);

		if (i % 6 == 0 && i != 0) {
			var spacer = document.createElement("div");
			spacer.className = "space";
			boards.insertBefore(spacer, null);
		}

		boards.appendChild(board);
	}
}

function main() {
	new Promise(() => {
		getCSV();
	}).then(() => {
		draw();
	});
}

getCSV();
