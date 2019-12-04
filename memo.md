# memo

[Minimum Hands-on Node.js / minimum handson nodejs - Speaker Deck](https://speakerdeck.com/ajido/minimum-handson-nodejs)のメモ

## ファイルディスクリプタ数の制限に注意

```sh
# 初期値では明らかに足りない
ulimit -n # 1024
```

> 初期値のままでは、高いトラフィックを処理し始めるとほぼ確実に`Too many open files`でプロセスが落ちる

Elixir/Erlang で良くある

```sh
ulimit -n 65536 # 上書き

# またはsystemdの設定
[Service]
LimitNOFILE=65536
```

## イベントループを止めるな

> 巨大な JSON をパーズするなど、重い処理を行うとシングルプロセス・シングルスレッドなのでサーバ自体が止まったような挙動になる

非同期処理(コールバック, Promise, async/await)で処理する

## イベント駆動のよくある失敗

`on('error')`ハンドリング漏れはプロセスが落ちる

## イベント駆動を async/await でハンドリング

```js
// before
stream.on('data', keys => {
  for (const key of keys) {
    console.log(key);
  }
});

stream.on('end', () => {
  console.log('end');
});

stream.on('error', err => {
  console.error(err);
});

// after
// stream.Readable で構造化されてると出来るらしい
try {
  for await (const keys of stream) {
    for (const key of keys) {
      console.log(key);
    }
  }
} catch (e) {
  console.error(err);
}
```
