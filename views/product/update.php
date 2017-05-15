<?php

use yii\helpers\Html;
use app\models\Product;

/* @var $this yii\web\View */
/* @var $model app\models\Product */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Product',
]) . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Products'), 'url' => ['panel']];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="product-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>
    <form action="/product/delete?id=<?= $_GET['id'] ?>" method="POST">
          <button type="submit" class="btn btn-link btn-delete-product" ><?=Yii::t('app', 'Delete')?></button>
    </form>
    <?= Html::a(Yii::t('app', 'Delete'), ['delete', 'product' => $model->id, 'product' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => Yii::t('app', 'Are you sure you want to delete this item?'),
                'method' => 'post',
            ],
        ]) ?>
</div>
