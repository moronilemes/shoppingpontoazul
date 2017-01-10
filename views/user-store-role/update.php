<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\UserStoreRole */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'User Store Role',
]) . $model->user_id;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'User Store Roles'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->user_id, 'url' => ['view', 'user_id' => $model->user_id, 'store_id' => $model->store_id, 'role' => $model->role]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="user-store-role-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
