<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use app\models\Product;
/* @var $this yii\web\View */
/* @var $model app\models\Store */

$products = Product::find()->where('store_id='.$model->id)->all();

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Stores'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="store-view">
    <div class="row">
      <div class="media col-sm-9">
        <div class="media-left">
          <a href="#">
            <img class="media-object" src="/uploads/<?=$model->image?>" alt="<?= Html::encode($this->title) ?>">
          </a>
        </div>
        <div class="media-body">
          <h1><?= Html::encode($this->title) ?></h1>
          <p><?=Yii::t('app', 'Phone')?>: <?= Html::encode($model->phone) ?></p>
          <p><?=Yii::t('app', 'Mobile')?>: <?= Html::encode($model->mobile) ?></p>
          <p><?=Yii::t('app', 'Store number')?>: <?= Html::encode($model->slot) ?></p>
        </div>
      </div>
      <div class="col-sm-3">
          <!-- Large modal -->
          <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target=".bs-example-modal-lg">Bate-papo</button>
          <?= Html::encode($model->observation) ?>
      </div>
    </div>
    <div class="row">
        <?php foreach ($products as $product): ?>
            <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <img src="/uploads/<?= $product->image ?>" alt="<?= $product->name ?>">
                    <div class="caption">
                    <h3><?= $product->name ?></h3>
                    <?php if ($product->price != '') {?>
                    <p>R$ <?= $product->price ?></p>
                    <?php } ?>
                    </div>
                </div>
            </div>


        <?php endforeach; ?>
    </div>

</div>


<div id='myModal' class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="col-sm-12">
        <h3>Bate-papo:</h3>
        <div class="chat-well well">

        </div>
        <div class="col-lg-12">
          <div class="input-group">
            <input type="text" class="form-control chat-input" placeholder="Digite sua mensagem">
            <span class="input-group-btn">
              <button class="btn btn-default chat-button" type="button">Enviar</button>
            </span>
          </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
          <!--<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
             data-auto-logout-link="false" data-use-continue-as="true"></div>-->
      </div>
    </div>
  </div>
</div>
