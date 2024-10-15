# continue-bookmarklet

画面遷移可能なブックマークレットを作成するための雛形です。bookmarklet.jsをブックマークレットとして登録して`https://www.google.co.jp/`を開いた状態で実行するとpromptで入力した文字列でGoogle検索が実行され、その後`文庫の森`でGoogle検索が実行されます。

## カスタマイズ方法

1. search関数のようにそのページで実行させたい処理を関数として定義します
2. 定義した関数を`waitForDocumentLoad` or `delay`関数を挟み実行します
