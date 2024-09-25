# 智学网排行榜

为方便了解自己现在学习水平所在层次而制作。

## 背景

中华人民共和国教育部此前于新闻发布会上表示：学校和教师不得公开学生考试成绩排名 [（原文）](http://www.moe.gov.cn/fbh/live/2021/53477/mtbd/202106/t20210601_534794.html)。
其中，《未成年人学校保护规定》第十条指出

> 学生的考试成绩、名次等学业信息，学校应当便利学生本人和家长知晓，但不得公开，不得宣传升学情况[（原文）](http://www.moe.gov.cn/srcsite/A02/s5911/moe_621/202106/t20210601_534640.html)

现今，多数服务于学校的电子阅卷与成绩统计的企业已着手实施相关工作，存在“一刀切”的行为。
科技的加速普及，我们的成绩早已可以通过相关企业方便查阅。但《规定》出台后，不少企业片面地删除成绩排名等相关内容。与“学校应当便利学生本人和家长知晓”存在矛盾。

因此，制作本脚本，便于查询**自己的成绩排名**。

## 如何食用

1. 安装支持扩展（插件）功能的主流浏览器，例如 Edge、Chrome 等
2. 安装 TamperMonkey （[chrome 网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)）
3. 新建用户脚本，并复制 main.js 内容到编辑器中
4. 保存并启用脚本
5. 打开智学网学情报告（全科），查看排名

## 屏幕截图

![屏幕截图](https://user-images.githubusercontent.com/53565118/149665753-8976705d-0319-4dd5-b475-7767079e7d14.png)

## 局限性

[⚖️ 关于少于三科考试科目无法展示排行榜的问题 #1](https://github.com/qianjunakasumi/ZhiXueRank/issues/1)

## 实现原理

劫持发挥水平学科诊断数据和班级人数的响应，通过简单计算得出排名。

**请注意，计算的排名并不准确，可能受不精准小数、Javascrpit 浮点数计算问题、赋分差距等影响，仅具有在智学网中发挥水平学科诊断的参考价值，不能反映学生实际、总体水平。**

## 维护水平

这个仓库的代码支持是尽力而为的，如果您有更好的建议或者提案请随时提交 Issue 或 PR :)

## 法律责任豁免条款

请勿将此代码用于违反相关法律法规的活动。

您利用此代码，包括但不限于使用、复制、传播、分发等，即代表您已阅读、理解并同意：开发者无法预测您的行为，您必须为滥用脚本而违反相关法律法规的行为负有全部法律责任。

## 许可证

[![GitHub license](https://img.shields.io/github/license/qianjunakasumi/ZhiXueRank?style=for-the-badge)](https://github.com/qianjunakasumi/ZhiXueRank/blob/main/LICENSE)
