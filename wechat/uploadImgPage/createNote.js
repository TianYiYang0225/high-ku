Page({
  data: {
    title: "", // 标题
    titleNum: 0, // 题目数量
    maxTitleNum: 30, // 最大标题长度
    content: "", // 备注
    contentNum: 0, // 备注长度
    maxContentNum: 150, // 最大备注长度
    images: [], // 图片数组
    fileList: [] // 图片存储id
  },

  // 控制标题数量
  handleTitleInput(e) {
    const { value } = e.detail;
    this.setData({
      title: value,
      titleNum: value.length
    });
  },

  // 控制内容
  handleContentInput(e) {
    const { value } = e.detail;
    this.setData({
      content: value,
      contentNum: value.length
    });
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 3, // 选择个数
      sizeType: ["original", "compressed"], // 图片质量 原图/压缩
      sourceType: ["album", "camera"], // 图片来源 相册/相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths);
        this.setData({
          images
        });
      }
    });
  },

  // 删除图片
  removeImage(e) {
    const { images } = this.data;
    const { index } = e.target.dataset;
    images.splice(index, 1);
    this.setData({
      images
    });
  },

  // 预览图片
  blowUpImage(e) {
    const { index } = e.target.dataset;
    const images = this.data.images;

    wx.previewImage({
      current: images[index],
      urls: images
    });
  },

  // 上传图片
  async uploadImg() {
    const { images, fileList } = this.data;
    // 为空时返回
    if (!images.length) {
      return [];
    }
    const openid = wx.getStorageSync("openid");
    const date = +new Date();
    // 上传图片
    wx.showLoading({
      title: "上传中"
    });
    for (let i = 0; i < images.length; i++) {
      const filePath = images[i];
      const cloudPath = `${openid}${date}` + filePath.match(/\.[^.]+?$/)[0];
      await wx.cloud
        .uploadFile({
          cloudPath,
          filePath
        })
        .then(res => {
          const { fileID } = res;
          fileList.push(fileID);
        })
        .catch(err => {
          // 如果发生网络错误
          console.log(err);
          wx.hideLoading();
          wx.showToast({
            title: "上传图片错误",
            icon: "none",
            duration: 2000
          });

          return [];
        });
    }
    return fileList;
  },
  // 提交表单
  formSubmit: async function(e) {
    const { name = "", remark = "" } = e.detail.value;
    if (!name) {
      wx.showToast({
        icon: "none",
        title: "请填写标题"
      });
      return;
    }
    // 图片id
    const imgIdList = await this.uploadImg();
    const _openid = wx.getStorageSync("openid");
    let data = {
      name,
      remark,
      imgIdList,
      _openid,
      kind: "img",
      type: "1"
    };
    wx.cloud.callFunction({
      name: "云函数",
      data,
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: "上传成功",
          icon: "none",
          duration: 2000
        });
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({
          title: "上传失败",
          icon: "none",
          duration: 2000
        });
        console.warn(err);
      }
    });
  },

  // 重置表单
  formReset: function() {
    // 清空数据
    this.setData({
      images: [],
      titleNum: 0,
      contentNum: 0,
      fileList: []
    });
  }
});
