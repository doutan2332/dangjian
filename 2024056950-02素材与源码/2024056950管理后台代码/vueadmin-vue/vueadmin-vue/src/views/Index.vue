<template>
  <!-- technology-left -->
  <div class="container">
    <div class="col-md-9 technology-left">
      <div class="tech-no">
        <div class="tc-ch wow fadeInDown"  data-wow-duration=".8s" data-wow-delay=".2s">

          <div class="tch-img">
            <!--              <img src="../assets/banner-1.png" class="img-responsive" alt="">-->
            <el-carousel height="500px">
              <el-carousel-item v-for="item in swiperImg" :key="item.id">
                <img :src="item.idView" class="img-responsive" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>

          <h3><a href="singlepage.html">中国青年</a></h3>
          <h6>摄于 <a href="singlepage.html">重庆师范大学 </a> April 6 2024.</h6>
          <p>习近平总书记强调：“青年人有理想、敢担当、能吃苦、肯奋斗，中国青年才会有力量，党和国家事业发展才能充满希望。”</p>
          <p>　在实现中国式现代化的新征程上，作为新时代的中国青年，我们必将牢记习近平总书记的嘱托，以永不懈怠的精神状态、永不停滞的前进姿态，在接续奋斗中谱写强国建设、民族复兴的壮丽篇章！</p>
        </div>
      </div>
    </div>
    <!-- technology-right -->
    <div class="col-md-3 technology-right">
      <div class="blo-top1">
        <div class="tech-btm">
          <h4>活动记录</h4>
          <div class="blog-grids wow fadeInDown"  data-wow-duration=".8s" data-wow-delay=".2s">
            <div class="blog-grid-left">
              <a href="singlepage.html"><img src="../assets/banner-02.png" class="img-responsive" alt=""></a>
            </div>
            <div class="blog-grid-right">

              <h5><a href="singlepage.html">2023国庆佳节</a> </h5>
            </div>
            <div class="clearfix"> </div>
          </div>
          <div class="blog-grids wow fadeInDown"  data-wow-duration=".8s" data-wow-delay=".2s">
            <div class="blog-grid-left">
              <a href="singlepage.html"><img src="../assets/banner-03.png" class="img-responsive" alt=""></a>
            </div>
            <div class="blog-grid-right">

              <h5><a href="singlepage.html">青马工程志愿服务</a> </h5>
            </div>
            <div class="clearfix"> </div>
          </div>
          <div class="blog-grids wow fadeInDown"  data-wow-duration=".8s" data-wow-delay=".2s">
            <div class="blog-grid-left">
              <a href="singlepage.html"><img src="../assets/banner-04.png" class="img-responsive" alt=""></a>
            </div>
            <div class="blog-grid-right">

              <h5><a href="singlepage.html">帮扶永远在路上</a> </h5>
            </div>
            <div class="clearfix"> </div>
          </div>
        </div>
      </div>


    </div>
    <div class="clearfix"></div>
    <!-- technology-right -->
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      swiperImg: [
        {id: 0, idView: require("../assets/banner-01.png")},
        {id: 1, idView: require("../assets/banner-02.png")},
        {id: 2, idView: require("../assets/banner-03.png")},
        {id: 3, idView: require("../assets/banner-04.png")},
        {id: 4, idView: require("../assets/banner-05.png")}
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.banner {
  padding: 10em 0 0;
  text-align: center;
}
.banner {
  background: url(../assets/banner-1.png) no-repeat 0px 0px;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -ms-background-size: cover;
  -moz-background-size: cover;
  min-height: 600px;
}
.container {
  width: 1170px;
  padding-top: 10px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
}
.technology {
  margin-top: 3em;
}
.container {
  width: 1170px;
}
.technology-left {
  width: 70%;
  padding: 0;
}
.col-md-9 {
  width: 75%;
}
.w3ls-left {
  padding: 0;
}
.col-md-6 {
  width: 50%;
}
.technology-right{
  width: 30%;
  margin-top: -29px;
}
.tech-btm {
  padding: 0em 2em;
  background: #fff;
}

.img-responsive, .thumbnail > img, .thumbnail a > img, .carousel-inner > .item > img, .carousel-inner > .item > a > img {
  display: block;
  max-width: 100%;
  height: auto;
}
.col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
  float: left;
}
a{
  text-decoration: none;
  color: #333333;
}
</style>
