<?php

/* @var $this yii\web\View */
use app\models\Store;

// Selects the stores "Destaque"
$stores = Store::find()->where("plan='D'")->all();


$this->title = Yii::t('app', 'Shopping Ponto Azul');
?>
<div class="body-content">
      <div class="col-sm-12 row">
              <h1><?=Yii::t('app', 'Featured stores')?></h1>
              <hr>
      </div>
          <div class="col-sm-12 row">
            <?php foreach($stores as $store){ ?>
              <div class="media col-sm-3 col-xs-3">
                  <div class="media-left">
                      <a href="/store/show?id=<?=$store->id?>">
                          <img class="media-object" src="/images/logo-placeholder.jpg" width="50" height="50" alt="..."></a></div>
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
