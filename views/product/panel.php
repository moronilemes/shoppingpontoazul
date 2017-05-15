<?php
use app\models\Product;

$storeProducts = Product::find()->where('store_id='.$blueSession['store_id'])->all();

?>


<div class="row x_title">
    <div class="col-md-6">
        <h3>Produtos<br>            
            <span class="hidden this-user-id">
                <?php 
                    echo Yii::$app->user->identity->id;                        
                ?>
            </span>
        </h3>
    </div>
    <div class="col-md-6">
        <div id="" class="pull-right">            
            <div class="btn-group pagination-list">
 <!--               <button type="button" class="btn btn-default btn-product-list-next">Anterior</button>                
                <button class="btn btn-default" type="button">1</button>
                <button class="btn btn-default active" type="button">2</button>
                <button class="btn btn-default" type="button">3</button>
                <button class="btn btn-default" type="button">4</button>
                <button type="button" class="btn btn-default btn-product-list-previous">Próximo</button>-->
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-primary btn-product-new" data-toggle="modal" data-target=".product-modal-lg"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>  Novo</button>
            </div>
        </div>
    </div>
</div>
<div class="row">
      <div class="table-responsive">
        <table class="table table-striped jambo_table bulk_action">
          <thead>
            <tr class="headings">
<!--              <th>
                <input type="checkbox" id="check-all" class="flat">
              </th>-->
              <th class="column-title">Foto </th>
              <th class="column-title no-link"> <span class="nobr">Nome do Produto </span></th>
              <th class="column-title">Preço </th>
<!--              <th class="bulk-actions" colspan="7">
                <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
              </th>-->
            </tr>
          </thead>

          <tbody class='product-list'>
            <?php foreach ($storeProducts as $thisProduct){ ?>
            <tr class="even pointer">
                <td class=" "><img width="25px" src='http://s3-sa-east-1.amazonaws.com/images.anymarket.com.br/118564309./1481195249571/thumbnail.jpg' /></td>
                <td class=" "><a href="/product/update?id=<?=$thisProduct->id?>" class="my-product-<?=$thisProduct->id?>"><?=$thisProduct->name?></a></td>
              <td class=" ">R$ <?=$thisProduct->price?></td>
            </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>
</div>



<div class="modal fade product-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title" id="myModalLabel">Detalhes do Produto</h4>
            </div>
            <div class="modal-body">
                                
                    <form action="/product/create" method="post" id="form-product-detail" data-parsley-validate="" class="form-vertical form-label-left" novalidate="">

                        <input type="hidden" id="product-store_id" class="form-control" name="Product[store_id]" value="<?=$blueSession['store_id']?>">
                        
                        <div class="col-md-12">
                        
                        <div class="form-group col-md-8">
                          <label class="" for="first-name">Nome do Produto <span class="required">*</span>                         </label>
                          <div class="">
                              <input type="text" id="product-name" class="form-control" name="Product[name]" maxlength="100">
                        </div>
                        </div>
                       
                        <div class="form-group col-md-4">
                          <label class="" for="price">Preço<span class="required">*</span>
                          </label>
                          <div class="">
                            <input placeholder="R$" type="number" id="product-price" class="form-control" name="Product[price]">
                          </div>
                        </div>
                        <div class="row col-md-12"> <label class="" for="origin">Fotos: </label> </div>
 <!--                      <div class="row img-thumbnail-list-product">                      
                      <div class="col-md-55">
                            <div class="thumbnail">
                              <div class="image view view-first">
                                <img style="width: 100%; display: block;" src="images/media.jpg" alt="image">
                                <div class="mask no-caption">
                                  <div class="tools tools-bottom">
                                    <a href="#"><i class="fa fa-link"></i></a>
                                    <a href="#"><i class="fa fa-pencil"></i></a>
                                    <a href="#"><i class="fa fa-times"></i></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>-->
                    
                    <div class="clearfix"></div>
                        <div class="row">
                            
                            
                            <div id="myDropzone" class="dropzone dz-clickable">
                                <div id="previews" class="dropzone-previews"></div>
                                <div class="dz-default dz-message"><span>Clique ou arraste as imagens aqui</span></div>
                            </div>
     
                            <?php

//                                echo \kato\DropZone::widget([
//                                       'options' => [
//                                           'maxFilesize' => '2',
//                                           'acceptedFiles' => 'image/*',
//                                           'url' => '/product/upload',
//                                           'addRemoveLinks' => true,
//                                           'maxFiles' => 6,
//                                           'dictDefaultMessage' => 'Clique ou arraste as imagens aqui',
//                                           'dictMaxFilesExceeded' => 'Você atingiu o limite de imagens para upload',
//                                           'dictRemoveFile' => 'Remover imagem',
//                                           'dictCancelUpload' => 'Calcelar upload',
//                                           'dictFileTooBig' => 'Imagem muito grande para este upload',
//                                           'hiddenInputContainer' => '#thisUploadProductID',  
//                                       ],
//                                       'clientEvents' => [
//                                           'complete' => "function(file){console.log(file)}",
//                                           'removedfile' => "function(file){alert(file.name + ' is removed')}"
//                                       ],
//                                   ]);

                            ?>
                        </div>
                    </div> 
                    
            </div>
            <div class="modal-footer">
<!--                <button type="button" class="btn btn-link btn-delete-product" >Deletar</button>-->
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                <button type="submit" class="btn btn-primary btn-save-product">Salvar produto</button>
                </form>
            </div>
        </div>
    </div>
</div>








 

 



