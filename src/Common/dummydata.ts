let dummyButtons: String[] = ["C",
    "Java",
    "Python",
    "C++",
    "C#",
    "Visual Basic",
    "JavaScript",
    "PHP",
    "R",
    "SQL",
    "Swift",
    "Go",
    "Ruby",
    "Assembly language",
    "MATLAB",
    "Perl",
    "PL/SQL",
    "Scratch",
    "Classic Visual Basic",
    "Rust",
    "Objective-C",
    "Delphi/Object Pascal",
    "D",
    "Lisp",
    "Dart",
    "SAS",
    "Transact-SQL",
    "Logo",
    "COBOL",
    "Kotlin",
    "Groovy",
    "Scala",
    "Julia",
    "ABAP",
    "PowerShell",
    "OpenEdge ABL",
    "Fortran",
    "Lua",
    "VBScript",
    "Ada",
    "FoxPro",
    "ML",
    "LabVIEW",
    "TypeScript",
    "Haskell",
    "Scheme",
    "Prolog",
    "ActionScript",
    "Bash",]


let dummyFiles: any = [
    {
        'file-name': '春暖花开',
        'file-path': '/root/',
        'file-description': '妻子：对面的格林太太太过分了，她把窗帘都拉开了。',
        'file-tags': ['PHP', 'Ruby', 'SAS']
    },
    {
        'file-name': '十字路口',
        'file-path': '/root/',
        'file-description': '第一次有个人在市场上卖冰棒，不好意思叫卖，旁边一个人正在喊：卖冰棒，他只好喊：我也是。',
        'file-tags': ['R', 'MATLAB', 'D']
    },
    {
        'file-name': '千军万马',
        'file-path': '/root/',
        'file-description': '听到你早上不小心把垃圾倒进垃圾坑里怎么爬也怕爬不上来，就来捡老太太的手拉着你说：城里人真浪费，不是长得丑点，也不能还~。',
        'file-tags': ['R', 'Perl', 'Delphi/Object Pascal']
    },
    {
        'file-name': '白手起家',
        'file-path': '/root/',
        'file-description': '还记得初中时第一次在树林里军训吗？教练对同学们说：第一排倒数！你惊奇地看着教练，教练又大声说了一遍：“报数。”于是，你不情愿地转身去拥抱那棵树。',
        'file-tags': ['PHP', 'Classic Visual Basic', 'D']
    },
    {
        'file-name': '张灯结彩',
        'file-path': '/root/',
        'file-description': '我和男朋友坐在出租车的后座。当车来的时候，我问多少钱，司机说15元，我男朋友开始在他的钱包里找钱。我口袋里刚好有钱，一边拿出20元钱给司机，一边对男友说：别 换了。男朋友还没有反应，只是听司机说：那就谢谢你了。',
        'file-tags': ['Java', 'Rust', 'Logo']
    },
    {
        'file-name': '风和日丽',
        'file-path': '/root/',
        'file-description': '丈夫回到家，妻子温柔地对他说：晚饭就像昨天一样准备好了。丈夫兴奋地说：太好了！妻子越来越好了！桌上的菜才发现那是昨天的剩菜。',
        'file-tags': ['PHP', 'MATLAB', 'COBOL']
    },
    {
        'file-name': '万里长城',
        'file-path': '/root/',
        'file-description': '一个小偷回家打了他的儿子！老婆看见后，连忙停下道：你疯了吗？为什么打儿子？小偷生气地吱吱叫着的说：这狗东西，他他居然说长大要当警察！老婆听后，也给了儿子 一耳光，骂道：该打了！这对你没有好处。',
        'file-tags': ['Java', 'Classic Visual Basic', 'Kotlin']
    },
    {
        'file-name': '人来人往',
        'file-path': '/root/',
        'file-description': '一大早上班穿鞋，发现有个鞋面上的水钻明显少了，于是问家人，我的鞋面上的水钻呢？五岁的儿子正在摘米吃的同时回答我摘下来送给我们班的女同学。',
        'file-tags': ['Java', 'Classic Visual Basic', 'D']
    },
    {
        'file-name': '自由自在',
        'file-path': '/root/',
        'file-description': '一位黑人丈夫从超市买了一套纯黑色内衣，兴奋地把它穿了回去。他一进屋就高兴地对他的中国妻子喊道：哈哈！亲爱的，你觉得我穿这件衣服好看吗？！当中国妻子看到她 的嘴张得大大的时候，她说：哦，我的天哪！亲爱的，你疯了吗？光天化日之下，你把衣服和裤子藏在哪里了。',
        'file-tags': ['Java', 'Rust', 'Logo']
    },
    {
        'file-name': '瓜田李下',
        'file-path': '/root/',
        'file-description': '鬼子扫过俺们村，村民们集中在村子里大喊：是八路要站起来！大家都退了一步，刘胡兰没有动，结果被残忍地打死了。后面有一位老人说：宝宝是个好孩子，就是反应有点 慢~。',
        'file-tags': ['Visual Basic', 'Rust', 'Delphi/Object Pascal']
    },
    {
        'file-name': '助人为乐',
        'file-path': '/root/',
        'file-description': '年轻人：你把我的信给你妹妹了吗？孩子：当我妹妹不在家的时候，我把它给了我爸爸。年轻人：哇！你父亲怎么说你的？孩子：我爸爸很生气，因为我把它还给了你。年轻 人：那信呢孩子：昨天你不在家的时候我把它给了你爸爸。',
        'file-tags': ['Visual Basic', 'Perl', 'D']
    },
    {
        'file-name': '红男绿女',
        'file-path': '/root/',
        'file-description': '有一天，一个果园的主人正在看自己的果园，突然发现一个小男孩坐在苹果树上，果园的主人喊道：你再偷我的苹果，给我下来，否则我就去告诉你爸爸！小男孩低下头喊道 ：爸爸，那边有人想和你说话。',
        'file-tags': ['C', 'MATLAB', 'SAS']
    },
    {
        'file-name': '春风化雨',
        'file-path': '/root/',
        'file-description': '你喜欢我给你的生日礼物吗？小偷喜欢你为什么不拿？我刚才不是告诉过你吗？就像一个小偷。',
        'file-tags': ['Python', 'Classic Visual Basic', 'COBOL']
    },
    {
        'file-name': '马到成功',
        'file-path': '/root/',
        'file-description': '老公，我不想让别人看到我的双下巴，不想再减肥了，怎么办？那你就得留胡子了。',
        'file-tags': ['Visual Basic', 'MATLAB', 'Objective-C']
    },
    {
        'file-name': '拔苗助长',
        'file-path': '/root/',
        'file-description': '在一个女生上课前，一个屁屁就在屁股旁边翘得高一点，放完后就放下，自以为没人知道，好长时间我们坐在后面的乐趣是，快看快看，要放！把。',
        'file-tags': ['C', 'Perl', 'Delphi/Object Pascal']
    },
    {
        'file-name': '安居乐业',
        'file-path': '/root/',
        'file-description': '两个家庭主妇聚在一起闲聊。我丈夫昨天设法自己洗了袜子。为什么他突然变得勤奋了？他进浴缸时忘了脱袜子。',
        'file-tags': ['PHP', 'Classic Visual Basic', 'D']
    },
    {
        'file-name': '走马观花',
        'file-path': '/root/',
        'file-description': '两个醉汉在他们的车里疯狂地开车。答：小心！前面有个急转弯。B：什么？你不开车吗。',
        'file-tags': ['Visual Basic', 'Ruby', 'Delphi/Object Pascal']
    },
    {
        'file-name': '念念不忘',
        'file-path': '/root/',
        'file-description': '我的妻子体重110公斤，她问我她是否总是我心目中的第一位。我回答说，当然，亲爱的。毕竟你挡了，没人挤啊。',
        'file-tags': ['SQL', 'Ruby', 'Objective-C']
    },
    {
        'file-name': '落花流水',
        'file-path': '/root/',
        'file-description': '一个会一点普通话的外国人。早上你想怎样和秘书打招呼？小姐瞪了他一眼，他瞪了一眼，马上又对她说：妈妈，你好吗。',
        'file-tags': ['C', 'Assembly language', 'Objective-C']
    },
    {
        'file-name': '一往无前',
        'file-path': '/root/',
        'file-description': '一个人正在偷卷心菜，这时来了一支部队在地里操练。当他看到一支军队时，他倒下了，然后军队开始开火，然后军队离开了，他站起来说，这有什么大不了的，该死，开一 门大炮。',
        'file-tags': ['Visual Basic', 'Go', 'Logo']
    },
    {
        'file-name': '落地生根',
        'file-path': '/root/',
        'file-description': '我乘地铁，坐在一个陌生的老太太旁边。手机响了，老太太接了电话，很爽快地对电话说：哎，我今晚没空儿，车破在坐地铁里，找了个鸭子很帅的，准备开房！拥挤的车厢 突然安静下来。我瞥了一眼我旁边的女人，当我回头看时，我发现整个巴士都在盯着我。',
        'file-tags': ['Visual Basic', 'Scratch', 'SAS']
    },
    {
        'file-name': '天罗地网',
        'file-path': '/root/',
        'file-description': '我的小妹妹在她两岁的时候从她的家乡转到桂林的一个幼儿园。老师找到我顾说：你要马上教教孩子普通话，他这普通话挺不标准的！我姐姐说：我知道这个问题，慢慢改正 。老师说：那好，你要快点，现在班上有一半的小朋友都讲这种味道',
        'file-tags': ['C++', 'Go', 'Lisp']
    },
    {
        'file-name': '东山再起',
        'file-path': '/root/',
        'file-description': '昨天早上凌晨3点钟，LZ下班回家，在路上遇见一个年轻女子躺在地上，还穿一种特殊的暴露，一看是晚上工作，也醉了，我想我的机会来了，去帮助一个，靠，美丽转身呕吐物我一体。我一直在想，是她喝醉的时候吐了，还是我的长相让我吐了。',
        'file-tags': ['C++', 'Scratch', 'Dart']
    },
    {
        'file-name': '一事无成',
        'file-path': '/root/',
        'file-description': '老太太想讨好她的孙女，于是对她说：我明天去巴黎给你买条裙子。孙女回答说：就买你最讨厌的吧。',
        'file-tags': ['Visual Basic', 'Scratch', 'Dart']
    },
    {
        'file-name': '山清水秀',
        'file-path': '/root/',
        'file-description': '一位女同事坚持穿露背装上班，我感到很好奇，于是问她：为什么总是穿得这么少？别胡扯了，她害羞地回答。我是支持张先生的，不是支持何先生的',
        'file-tags': ['SQL', 'Perl', 'COBOL']
    },
    {
        'file-name': '语重心长',
        'file-path': '/root/',
        'file-description': '愚公的家门口有一座大山。愚公认为这是一种阻碍。河曲智叟拦住他说：“如果你不动它，就会有大灾难。”愚公不听，以为只要他坚持，就能移山。那里有一条会有一条路, 终于到了那一天，那座山被完全移走了，愚公眼里含着泪水，突然一阵爆裂声，一条蛇从地上钻了出来，笑着说：哈哈哈，可恶的葫芦娃，老母出来了！',
        'file-tags': ['C', 'Perl', 'COBOL']
    },
    {
        'file-name': '别有洞天',
        'file-path': '/root/',
        'file-description': '在山路上，一位老爷车停了下来。司机说：“让我看看你的救生索。”MM伸手过去，司机仔细看了看：好了，你的生命线很长，上车吧。MM不明白：你为什么要看我的生命线？ 刹车坏了！',
        'file-tags': ['PHP', 'Classic Visual Basic', 'Delphi/Object Pascal']
    },
    {
        'file-name': '水深火热',
        'file-path': '/root/',
        'file-description': '老师：事实上，黄鼠狼是不吃鸡的。这是科学家通过实验得出的结论。曾经把鸡和黄鼠狼放在一起，第二天你猜怎么着？鸡怀孕了。',
        'file-tags': ['C', 'PL/SQL', 'D']
    },
    {
        'file-name': '鸟语花香',
        'file-path': '/root/',
        'file-description': '一个人，会发情，两个人，会多情，三个人，会通奸。',
        'file-tags': ['C', 'Assembly language', 'Dart']
    },
    {
        'file-name': '自以为是',
        'file-path': '/root/',
        'file-description': '记得有一次和一个女同事喝一个聚会，喝女同事也喝醉了说晚上要我陪她睡觉，我听到后一巴掌过去，让她一个人呆在那里，我想她是想偷我的口袋里的200美元在我睡着了，真的没想到她是这种人，我呸！',
        'file-tags': ['C', 'Rust', 'Objective-C']
    }
];

// let descriptions = ["妻子：对面的格林太太太过分了，她把窗帘都拉开了。",
//     "第一次有个人在市场上卖冰棒，不好意思叫卖，旁边一个人正在喊：卖冰棒，他只好喊：我也是。",
//     "听到你早上不小心把垃圾倒进垃圾坑里怎么爬也怕爬不上来，就来捡老太太的手拉着你说：城里人真浪费，不是长得丑点，也不能还~。",
//     "还记得初中时第一次在树林里军训吗？教练对同学们说：第一排倒数！你惊奇地看着教练，教练又大声说了一遍：“报数。”于是，你不情愿地转身去拥抱那棵树。",
//     "我和男朋友坐在出租车的后座。当车来的时候，我问多少钱，司机说15元，我男朋友开始在他的钱包里找钱。我口袋里刚好有钱，一边拿出20元钱给司机，一边对男友说：别换了。男朋友还没有反应，只是听司机说：那就谢谢你了。",
//     "丈夫回到家，妻子温柔地对他说：晚饭就像昨天一样准备好了。丈夫兴奋地说：太好了！妻子越来越好了！桌上的菜才发现那是昨天的剩菜。",
//     "一个小偷回家打了他的儿子！老婆看见后，连忙停下道：你疯了吗？为什么打儿子？小偷生气地吱吱叫着的说：这狗东西，他他居然说长大要当警察！老婆听后，也给了儿子一耳光，骂道：该打了！这对你没有好处。",
//     "一大早上班穿鞋，发现有个鞋面上的水钻明显少了，于是问家人，我的鞋面上的水钻呢？五岁的儿子正在摘米吃的同时回答我摘下来送给我们班的女同学。",
//     "一位黑人丈夫从超市买了一套纯黑色内衣，兴奋地把它穿了回去。他一进屋就高兴地对他的中国妻子喊道：哈哈！亲爱的，你觉得我穿这件衣服好看吗？！当中国妻子看到她的嘴张得大大的时候，她说：哦，我的天哪！亲爱的，你疯了吗？光天化日之下，你把衣服和裤子藏在哪里了。",
//     "鬼子扫过俺们村，村民们集中在村子里大喊：是八路要站起来！大家都退了一步，刘胡兰没有动，结果被残忍地打死了。后面有一位老人说：宝宝是个好孩子，就是反应有点慢~。",
//     "年轻人：你把我的信给你妹妹了吗？孩子：当我妹妹不在家的时候，我把它给了我爸爸。年轻人：哇！你父亲怎么说你的？孩子：我爸爸很生气，因为我把它还给了你。年轻人：那信呢孩子：昨天你不在家的时候我把它给了你爸爸。",
//     "有一天，一个果园的主人正在看自己的果园，突然发现一个小男孩坐在苹果树上，果园的主人喊道：你再偷我的苹果，给我下来，否则我就去告诉你爸爸！小男孩低下头喊道：爸爸，那边有人想和你说话。",
//     "你喜欢我给你的生日礼物吗？小偷喜欢你为什么不拿？我刚才不是告诉过你吗？就像一个小偷。",
//     "老公，我不想让别人看到我的双下巴，不想再减肥了，怎么办？那你就得留胡子了。",
//     "在一个女生上课前，一个屁屁就在屁股旁边翘得高一点，放完后就放下，自以为没人知道，好长时间我们坐在后面的乐趣是，快看快看，要放！把。",
//     "两个家庭主妇聚在一起闲聊。我丈夫昨天设法自己洗了袜子。为什么他突然变得勤奋了？他进浴缸时忘了脱袜子。",
//     "两个醉汉在他们的车里疯狂地开车。答：小心！前面有个急转弯。B：什么？你不开车吗。",
//     "我的妻子体重110公斤，她问我她是否总是我心目中的第一位。我回答说，当然，亲爱的。毕竟你挡了，没人挤啊。",
//     "一个会一点普通话的外国人。早上你想怎样和秘书打招呼？小姐瞪了他一眼，他瞪了一眼，马上又对她说：妈妈，你好吗。",
//     "一个人正在偷卷心菜，这时来了一支部队在地里操练。当他看到一支军队时，他倒下了，然后军队开始开火，然后军队离开了，他站起来说，这有什么大不了的，该死，开一门大炮。",
//     "我乘地铁，坐在一个陌生的老太太旁边。手机响了，老太太接了电话，很爽快地对电话说：哎，我今晚没空儿，车破在坐地铁里，找了个鸭子很帅的，准备开房！拥挤的车厢突然安静下来。我瞥了一眼我旁边的女人，当我回头看时，我发现整个巴士都在盯着我。",
//     "我的小妹妹在她两岁的时候从她的家乡转到桂林的一个幼儿园。老师找到我顾说：你要马上教教孩子普通话，他这普通话挺不标准的！我姐姐说：我知道这个问题，慢慢改正。老师说：那好，你要快点，现在班上有一半的小朋友都讲这种味道",
//     "昨天早上凌晨3点钟，LZ下班回家，在路上遇见一个年轻女子躺在地上，还穿一种特殊的暴露，一看是晚上工作，也醉了，我想我的机会来了，去帮助一个，靠，美丽转身呕吐物我一体。我一直在想，是她喝醉的时候吐了，还是我的长相让我吐了。",
//     "老太太想讨好她的孙女，于是对她说：我明天去巴黎给你买条裙子。孙女回答说：就买你最讨厌的吧。",
//     "一位女同事坚持穿露背装上班，我感到很好奇，于是问她：为什么总是穿得这么少？别胡扯了，她害羞地回答。我是支持张先生的，不是支持何先生的",
//     "愚公的家门口有一座大山。愚公认为这是一种阻碍。河曲智叟拦住他说：“如果你不动它，就会有大灾难。”愚公不听，以为只要他坚持，就能移山。那里有一条会有一条路，终于到了那一天，那座山被完全移走了，愚公眼里含着泪水，突然一阵爆裂声，一条蛇从地上钻了出来，笑着说：哈哈哈，可恶的葫芦娃，老母出来了！",
//     "在山路上，一位老爷车停了下来。司机说：“让我看看你的救生索。”MM伸手过去，司机仔细看了看：好了，你的生命线很长，上车吧。MM不明白：你为什么要看我的生命线？刹车坏了！",
//     "老师：事实上，黄鼠狼是不吃鸡的。这是科学家通过实验得出的结论。曾经把鸡和黄鼠狼放在一起，第二天你猜怎么着？鸡怀孕了。",
//     "一个人，会发情，两个人，会多情，三个人，会通奸。",
//     "记得有一次和一个女同事喝一个聚会，喝女同事也喝醉了说晚上要我陪她睡觉，我听到后一巴掌过去，让她一个人呆在那里，我想她是想偷我的口袋里的200美元在我睡着了，真的没想到她是这种人，我呸！",]

// let names = [
//     '春暖花开', '十字路口', '千军万马',
//     '白手起家', '张灯结彩', '风和日丽',
//     '万里长城', '人来人往', '自由自在',
//     '瓜田李下', '助人为乐', '红男绿女',
//     '春风化雨', '马到成功', '拔苗助长',
//     '安居乐业', '走马观花', '念念不忘',
//     '落花流水', '一往无前', '落地生根',
//     '天罗地网', '东山再起', '一事无成',
//     '山清水秀', '语重心长', '别有洞天',
//     '水深火热', '鸟语花香', '自以为是'
// ]

// for(let i =0 ; i < 30; i++){obj.push({"file-name":names[i], "file-path":"/root/", "file-description": descriptions[i], "file-tags":[tags[Math.floor(Math.random()*10)], tags[Math.floor(Math.random()*10)+10], tags[Math.floor(Math.random()*10)+20]]})}

export { dummyButtons, dummyFiles };