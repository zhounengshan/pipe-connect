# 中国象棋
独立手机象棋游戏，发布在本仓库 xiangqi/ 目录。
- 红方玩家对黑方电脑，入门 / 进阶 / 挑战三级 AI
- 基本象棋规则、将军应对、困毙与胜负判定
- 整轮悔棋、自动续局、落子音效
- 中文棋谱记录、逐步回放、文本导出
- 中炮对屏风马 / 仙人指路 / 飞相局三份开局演示
- 中国象棋甲级联赛及全国个人赛大师棋谱，支持逐手回放、点棋盘前进
- 添加主屏幕、首次成功缓存后离线使用
无需构建和第三方网络依赖。AI 通过 Web Worker 计算。

赛事谱来源：Chinese Chess Practical Dataset (CCPD)，Yu-Han Tseng & Bo-Nian Chen (2026)，CC BY 4.0。内置三局谱来自公开数据集，保留对局赛事及棋手信息；着法按本游戏规则引擎校验、转换。来源及许可：https://github.com/Yvonne761/Chinese-Chess-Practical-Dataset ，https://creativecommons.org/licenses/by/4.0/。
休闲和棋规则：三次重复、120半回合无吃子。未实施专业赛场长将长捉裁定。
挑战档为浏览器轻量搜索引擎，不代表专业象棋软件等级。
验证：node test-engine.cjs；基础走子、将帅安全、初始局面 perft 44/1920、开局谱、三级 AI。
