<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\StoreCategory */

$this->title = Yii::t('app', 'Create Store Category');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Store Categories'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="store-category-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
