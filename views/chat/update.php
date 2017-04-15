<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Chat */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Chat',
]) . $model->store;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Chats'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->store, 'url' => ['view', 'store' => $model->store, 'customer' => $model->customer]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="chat-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
