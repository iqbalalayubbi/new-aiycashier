<template>
  <div class="carousel w-full">
    <div id="slide1" class="carousel-item relative w-full">
        <div class="card w-60 bg-color1 shadow-xl rounded-xl">
            <div class="card-body flex-row items-center gap-5 text-white py-5 px-3">
                <Icon icon="ant-design:line-chart-outlined" class="text-6xl"/>
                <div>
                    <h2 class="card-title">Untung</h2>
                    <p>Rp20.000</p>
                </div>
            </div>
        </div>
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 opacity-30">
            <a href="#slide4" class="btn btn-circle">❮</a> 
            <a href="#slide2" class="btn btn-circle">❯</a>
        </div>
    </div> 
    <div id="slide2" class="carousel-item relative w-full">
        <div class="card w-60 bg-color1 shadow-xl rounded-xl">
            <div class="card-body flex-row items-center gap-5 text-white py-5 px-3">
                <Icon icon="carbon:report" class="text-6xl"/>
                <div>
                    <h2 class="card-title">Terjual</h2>
                    <p>200</p>
                </div>
            </div>
        </div>
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 opacity-30">
            <a href="#slide1" class="btn btn-circle">❮</a> 
            <a href="#slide3" class="btn btn-circle">❯</a>
        </div>
    </div> 
    <div id="slide3" class="carousel-item relative w-full">
        <div class="card w-60 bg-color1 shadow-xl rounded-xl">
            <div class="card-body flex-row items-center gap-5 text-white py-5 px-3">
                <Icon icon="akar-icons:shipping-box-01" class="text-6xl"/>
                <div>
                    <h2 class="card-title">Barang</h2>
                    <p>Rp20.000</p>
                </div>
            </div>
        </div>
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 opacity-30">
            <a href="#slide2" class="btn btn-circle">❮</a> 
            <a href="#slide4" class="btn btn-circle">❯</a>
        </div>
    </div> 
</div>
</template>

<script>
export default {
}
</script>

<style>

</style>