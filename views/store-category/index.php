<?php

use yii\helpers\Html;
use yii\grid\GridView;
use app\models\Store;
use app\models\Category;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Store Categories');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="store-category-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a(Yii::t('app', 'Create Store Category'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            //'id',
            //'store',
            ['label'=>Yii::t('app','Store'), 'value'=>function ($model, $index, $widget) { return (Store::findIdentity($model->store)->name); }],
            //'category',
            ['label'=>Yii::t('app','Category'), 'value'=>function ($model, $index, $widget) { return (Category::findIdentity($model->category)->name); }],

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
