<?php

/* @var $this yii\web\View */
use app\models\Store;

// Selects the stores "Destaque"
$stores = Store::find()->where("plan='D'")->all();


$this->title = Yii::t('app', 'Shopping Ponto Azul');
?>
<div class="">

    <div class="body-content">

         <div class="row">
        <div class="col-lg-12">
            <div class="row col-sm-12">
                <h1><?=Yii::t('app', 'Featured stores')?></h1>
                <hr>
            </div>
            <div class="col-lg-12">
                <div class="row">
                <?php foreach($stores as $store){ ?>
                    <div class="media col-lg-3">
                        <div class="media-left">
                            <a href="/store/show?id=<?=$store->id?>">
                                <img class="media-object" src="/images/logo-placeholder.jpg" width="64" height="64" alt="..."></a></div>
                        <div class="media-body">
                            <a href="/store/show?id=<?=$store->id?>">
                            <h4 class="media-heading"><?=$store->name?></h4>
                            <h6>
                                <?=$store->observation?>
                            </h6>
                            </a>
                        </div>
                    </div>
                <?php } ?>
            </div>
                </div>
        </div>
        
      </div><!-- /.row -->

    </div>
</div>
