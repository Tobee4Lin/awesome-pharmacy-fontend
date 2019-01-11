<template>
    <div style="background-color:#fff;">
        <HeaderTop />
        <div class="wrap">
            <PersonSlide :num="1"/>

            <div class="info">
                没有多少信息可以展示！
            </div>
        </div>

        <myFooter />
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import PersonSlide from "@/components/PersonSlide";
import myFooter from "@/components/Footer";
export default {
    name: "info",
    components: {
        HeaderTop,
        PersonSlide,
        myFooter
    }
}
</script>

<style scoped lang="less">
    .wrap {
        min-height: 350px;
        .info {
            width: 790px;
            background-color: #fff;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 50px;
            border: 1px solid #eee;
            padding: 5px;
        }
    }
</style>
