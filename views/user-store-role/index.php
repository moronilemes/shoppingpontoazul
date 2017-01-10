<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'User Store Roles');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-store-role-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a(Yii::t('app', 'Create User Store Role'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'user.displayname:text:User',
            //'user_id', 
            //'store.name:text:Store',
            [
                'attribute' => 'store.name',
                'format' => 'text',
                'label' => 'Store'
            ],
            //'store_id',
            'role',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
