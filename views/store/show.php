<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Store */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Stores'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="store-view">
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
