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
    <div class="col-sm-3">
        <h1><?= Html::encode($this->title) ?></h1>
    </div>
    <div class="col-sm-3">
        <p>Fone: <?= Html::encode($model->phone) ?></p>
        <p>Celular: <?= Html::encode($model->mobile) ?></p>
        <p>Loja número <?= Html::encode($model->slot) ?></p>
    </div>
    <div class="col-sm-3">
        <?= Html::encode($model->observation) ?>
    </div>
    <div class="col-sm-3">
        CHAT
    </div>
    </div>
    <div class="row">
        <?php foreach ($products as $product): ?>
            <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <img src="/images/logo-placeholder.jpg" alt="<?= $product->name ?>">
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
