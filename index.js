const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
const csv = require("csvtojson");
const { Parser } = require("json2csv");
const chrome = require("selenium-webdriver/chrome");
const { locateWith } = require("selenium-webdriver");
const { time } = require("console");

let fypList = [];
let getPostData_comments = [];
// function to get cookie data
async function getCookies(filename) {
  const cookies = await csv().fromFile(filename);
  for (const cookie of cookies) {
    fypList.push(cookie);
  }
  return fypList;
}

async function getFpyData() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://www.tiktok.com/");
    for (let i = 1; i <= 8; i++) {
      let numLikes = await driver
        .findElement(
          By.xpath(
            `/html/body/div[2]/div[2]/div[2]/div[1]/div[${i}]/div/div[2]/div[2]/button[1]/strong`
          )
        )
        .getText();
      let numComments = await driver
        .findElement(
          By.xpath(
            `/html/body/div[2]/div[2]/div[2]/div[1]/div[${i}]/div/div[2]/div[2]/button[2]/strong`
          )
        )
        .getText();
      let numShares = await driver
        .findElement(
          By.xpath(
            `/html/body/div[2]/div[2]/div[2]/div[1]/div[${i}]/div/div[2]/div[2]/button[3]/strong`
          )
        )
        .getText();
      let userId = await driver
        .findElement(
          By.xpath(
            `/html/body/div[2]/div[2]/div[2]/div[1]/div[${i}]/div/div[1]/div[1]/a[2]/h3`
          )
        )
        .getText();
      fypList.push({
        numLikes: numLikes,
        numComments: numComments,
        numShares: numShares,
        userId: userId,
      });
      console.log(fypList, fypList.length, "fypList");
    }
  } catch {
    console.log("catch");
  }
}

// unable to locate element of tiktok video
async function getPostData() {
  let driver = await new Builder().forBrowser("chrome").build();
  // go to search option
  await driver.get(
    "https://www.tiktok.com/search?q=ukraine&t=1647319574104"
  );

  console.log("1");

  // get the cookies for the indiv website
  const cookies = await getCookies("indivPostCookies.csv");
  for (const i of cookies) {
    // add cookies to web driver
    await driver.manage().addCookie(i);
  }

  // refresh browser
  await driver.navigate().refresh();
  // wait for the browser to refresh
  await driver.manage().setTimeouts({ implicit: 5000 });

  // click post data
  /*
   *
   * @params:
   *  xPathPost: get the xpath of the post
   *
   *
   *
   *
   *
   *
   *
   */

  async function getIndivData() {
    for (i = 1; i < 20; i++) {
      console.log(i + "i");
      let postThumbnail = await driver.findElement(
        By.xpath(
          `//*[@id="app"]/div[2]/div[2]/div[2]/div[1]/div/div[${
            i + 1
          }]/div[1]/div/div/a`
        )
      );
      postThumbnail.click();
      await driver.manage().setTimeouts({ implicit: 7000 });
      // check if there are comments available
      let numOfComments = await driver.wait(
        until.elementLocated(
          By.xpath(
            '//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[2]/div[2]/div[1]/div[1]/button[2]/strong'
          )
        )
      );
      let numOfCommentsNumber = await numOfComments.getText();
      console.log(numOfCommentsNumber + "numof comments");

      if (numOfCommentsNumber != 0) {
        for (j = 1; j < Math.floor(numOfCommentsNumber * 0.8); j++) {
          console.log(j, " j loop");
          if (
            (await driver.findElement(
              By.xpath(
                `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${j}]/div[1]/div[1]/a/span`
              )
            )) == null
          ) {
            break;
          }
          let userCommentsName = await driver.wait(
            until.elementLocated(
              By.xpath(
                `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${j}]/div[1]/div[1]/a/span`,

                1000
              )
            )
          );
          console.log("userCommentname ran");

          // scroll the browser until we get the name
          // ensures that browser driver is able to get the element located
          await driver.executeScript(
            "arguments[0].scrollIntoView(true);",
            userCommentsName
          );

          let userCommentsContent = await driver.wait(
            until.elementLocated(
              By.xpath(
                `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${j}]/div[1]/div[1]/p[1]/span`,

                1000
              )
            )
          );
          let userCommentsTime = await driver.wait(
            until.elementLocated(
              By.xpath(
                `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${j}]/div[1]/div[1]/p[2]/span[1]`,

                1000
              )
            )
          );
          // check if comment has replies, get the comments if needed
          let userCommentReplyExist;
          try {
            userCommentReplyExist = await driver.findElement(
              By.xpath(
                `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${j}]/div[2]/div[1]/p`
              )
            );
            console.log(
              await userCommentReplyExist.getText(),
              "usecommmm"
            );
            // click on the user replies to comment
            await userCommentReplyExist.click();
          } catch {
            userCommentReplyExist = null;
          }
          let userCommentReplies;
          if (userCommentReplyExist != null) {
            for (k = 1; k < 15; k++) {
              try {
                userCommentReplies = await driver.findElement(
                  By.xpath(
                    `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[1]/div[2]/div[${k}]/div[1]/a/span`
                  )
                );
              } catch {
                userCommentReplies = null;
                // break for loop
                k = 15;
              }
              if (userCommentReplies != null) {
                // add j to stop it from running when max comments is reached
                j++;
                console.log(
                  await userCommentReplies.getText(),
                  "usercomment replies"
                );

                let userCommentRepliesContent = await driver.findElement(
                  By.xpath(
                    `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[1]/div[2]/div[${k}]/div[1]/p[1]/span`
                  )
                );
                console.log(
                  await userCommentRepliesContent.getText(),
                  "user comment replies content"
                );

                let userCommentRepliesTime = await driver.findElement(
                  By.xpath(
                    `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[1]/div[2]/div[${k}]/div[1]/p[2]/span[1]`
                  )
                );
                console.log(
                  await userCommentRepliesTime.getText(),
                  "user comment replies time"
                );
              } else {
                //do nothing
              }
            }
          } else {
            console.log("No replies to comment");
          }

          console.log(await userCommentsName.getText(), "name");
          console.log(await userCommentsContent.getText(), "content");
          console.log(await userCommentsTime.getText(), "time");
        }
      } else {
        console.log("element not found");
      }

      // click on back button to continue with other post
      let postBackButton = await driver.wait(
        until.elementLocated(
          By.xpath(
            '//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[1]/button[1]'
          )
        )
      );

      await postBackButton.click();
    }
  }
  getIndivData();

  // let postThumbnail = await driver.findElement(
  //   By.xpath(
  //     `//*[@id="app"]/div[2]/div[2]/div[2]/div[1]/div/div[${
  //       i + 1
  //     }]/div[1]/div/div/a`
  //   )
  // );
  // console.log("2");
  // console.log(postThumbnail, "tagname");
  // postThumbnail.click();

  // // get comments on post after solving captcha

  // for (i = 1; i < 10; i++) {
  //   let userCommentsName = await driver.wait(
  //     until.elementLocated(
  //       By.xpath(
  //         `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${i}]/div[1]/div[1]/a/span`,

  //         1000
  //       )
  //     )
  //   );

  //   let userCommentsContent = await driver.wait(
  //     until.elementLocated(
  //       By.xpath(
  //         `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${i}]/div[1]/div[1]/a/span`,

  //         1000
  //       )
  //     )
  //   );

  //   let userCommentsTime = await driver.wait(
  //     until.elementLocated(
  //       By.xpath(
  //         `//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[2]/div[3]/div[${i}]/div[1]/div[1]/p[2]/span[1]`,

  //         1000
  //       )
  //     )
  //   );

  //   console.log(await userCommentsName.getText(), "comments");
  //   console.log(await userCommentsContent.getText(), "comments");
  //   console.log(await userCommentsTime.getText(), "comments");
  // }

  // click on back button to continue with other post
  // let postBackButton = await driver.wait(
  //   until.elementLocated(
  //     By.xpath(
  //       '//*[@id="app"]/div[2]/div[2]/div[2]/div[3]/div[1]/button[1]'
  //     )
  //   )
  // );

  // postBackButton.click();

  // let postThumbnail2 = await driver.findElement(
  //   By.xpath(
  //     `//*[@id="app"]/div[2]/div[2]/div[2]/div[1]/div/div[3]/div[1]/div/div/a`
  //   ) //*[@id="app"]/div[2]/div[2]/div[2]/div[1]/div/div[3]/div[1]/div/div/a/
  // );
  // console.log("2");
  // console.log(postThumbnail2, "tagname");
  // postThumbnail2.click();
  // console.log("done");
}
// fyp data only able to get the first 8 elements for fyp post as 9th onwards need to load
// getFpyData();
getPostData();
