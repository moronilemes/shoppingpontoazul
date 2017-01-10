<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\UserStoreRole */

$this->title = Yii::t('app', 'Create User Store Role');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'User Store Roles'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-store-role-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
