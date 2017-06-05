<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\ArrayHelper;
use app\models\Store;
use app\models\Category;

/* @var $this yii\web\View */
/* @var $model app\models\StoreCategory */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="store-category-form">

    <?php $form = ActiveForm::begin(); ?>

    <!--<?= $form->field($model, 'store')->textInput() ?>-->
    <?= $form->field($model, 'store')->dropDownList(ArrayHelper::map(Store::find()->select(['name','id'])->all(), 'id', 'name')) ?>

    <!--<?= $form->field($model, 'category')->textInput() ?>-->
    <?= $form->field($model, 'category')->dropDownList(ArrayHelper::map(Category::find()->select(['name','id'])->all(), 'id', 'name')) ?>


    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
<!----------------------------------------------------------->
