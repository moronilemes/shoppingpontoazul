<?php

/* @var $this yii\web\View */
use app\models\Store;

// Selects the stores "Destaque"
$stores = Store::find()->where("plan='D'")->all();


$this->title = 'Shopping Ponto Azul';
?>
<div class="">

    <div class="body-content">

         <div class="row">
        <div class="col-lg-12">
            <div class="row col-sm-12">
                <h1>Lojas Destaque</h1>
                <br>
            </div>
            <div class="col-lg-12">
                <div class="row">
                <?php foreach($stores as $store){ 
                    //if($store->plan == "P"){?>
                        
                        
                <div class="col-lg-3">
                    <div class="media">
                        <div class="media-left">
                            <a href="/store/show/<?=$store->id?>">
                                <img class="media-object" src="/images/logo-placeholder.jpg" width="64" height="64" alt="..."></a></div>
                        <div class="media-body">
                            <a href="/store/show/<?=$store->id?>">
                            <h4 class="media-heading"><?=$store->name?></h4>
                            <h6>
                                <?=$store->observation?>
                            </h6>
                            </a>
                        </div>
                    </div>
                </div>

                <?php }    ?>
                    
                
                
            </div>
                </div>
        </div>
        
      </div><!-- /.row -->

    </div>
</div>
